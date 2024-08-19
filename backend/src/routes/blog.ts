import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import {createBlogInput, updateBlogInput} from "@arnavbsingh/verse-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use("/*", async (c, next) => {
    try {
      const authHeader = c.req.header("authorization") || "";
      const token = authHeader.replace(/^Bearer\s/, "");
      if (!token) {
        c.status(401);
        return c.json({ message: "Authorization header is missing!" });
      }
  
      const jwtSecret = c.env.JWT_SECRET;
      if (!jwtSecret) {
        c.status(500);
        return c.json({ message: "JWT_SECRET environment variable is not set!" });
      }
  
      try {
        const user = await verify(token, jwtSecret);
        c.set("userId", user.id as string);
        await next();
      } catch (verifyError) {
        console.error("Token verification failed:", verifyError);
        c.status(403);
        return c.json({ message: "Invalid token!" });
      }
    } catch (e) {
      console.error("Error during authentication:", e);
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  });

blogRouter.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const {success} = createBlogInput.safeParse(body);

        if(!success) {
          c.status(411);
          return c.json({
            message: "Inputs are not valid"
          })
        }
        const authorId = c.get("userId");

        if (!authorId) {
            c.status(403); // Forbidden
            return c.json({ message: "User ID not found!" });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId) // Ensure authorId is a number
            }
        });

        return c.json({ id: blog.id });
    } catch (e) {
        console.error("Error creating blog:", e);
        c.status(500); // Internal Server Error
        return c.json({ message: "Internal Server Error" });
    }
});


  
  
  blogRouter.put('/', async (c) => {
    const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body);

    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not valid"
      })
    }
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },

        data: {
            title: body.title,
            content: body.content
        }
    })


    return c.json({
        id: blog.id

    })
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author:{
                select: {
                    name: true
                }
            }
        }
    });
    
    return c.json({
        blogs
    })
        
    
  })
  blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());

      try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id),
            }
        })

        return c.json({
            blog
      
          });

      }

      catch(e){
        c.status(411);
        return c.json({
           message: "Error While Fetching Blog Post"
      
          });

      }
  
  })
  
