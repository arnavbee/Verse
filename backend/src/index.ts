import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/vlog", blogRouter);

app.use('/api/v1/blog/*', async (c, next) => {

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


app.post('/api/v1/user/signup', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const jwt = await sign({
      id: user.id,
    }, "c.env.JWT_SECRET")

    return c.text(jwt)}

    catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
})


app.post('/api/v1/signin', async (c) => {
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


app.post('/api/v1/blog', (c) => {
  return c.text('Sign In Route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('sign in route')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text('get blog route')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Blog bulk here')
})

export default app;
