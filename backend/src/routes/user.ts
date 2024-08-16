import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify} from 'hono/jwt'
import { Bindings } from "hono/types";
import z from "zod";

const signupInput = z.object({

  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()


})


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string

    }
}>();


userRouter.use('/api/v1/blog/*', async (c, next) => {

    const header = c.req.header("authorization") || "";
  
    const token = header.split("")[1]
  
    const response = await verify(header, c.env.JWT_SECRET);
    if(response.id){
      next()
    }
  
    else {
      c.status(403);
      return c.json({error: "unauthorized"})
    }
  
  
   
  })
  
  
  userRouter.post('/signup', async (c) => {

    const body = await c.req.json();

    const {success} = signupInput.safeParse(body);

    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not valid"
      })
    }
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        }
      })
  
      const jwt = await sign({
        id: user.id,
      }, c.env.JWT_SECRET)
  
      return c.text(jwt)}
  
      catch(e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
      }
  })
  
  
  userRouter.post('/api/v1/signin', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
      })
  
      if(!user){
        c.status(403);
        return c.json({
          message: "incorrect credentials"
        })
      }
  
      const jwt = await sign({
        id: user.id,
        email: user.email
      }, "c.env.JWT_SECRET")
  
      return c.text(jwt)
  
    } catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  
      
  
  })

