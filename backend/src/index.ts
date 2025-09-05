import { Hono } from 'hono'
import { cors } from 'hono/cors'
import user from './routes/userRoute'
import blog from './routes/blogRoute'

const app = new Hono().basePath('/api/v1')

app.use('*', cors())

app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

app.route('/user', user)
app.route('/blog', blog)

app.get('/health', (c) => c.json({ status: 'ok' }))

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app