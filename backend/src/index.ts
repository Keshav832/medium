import { Hono } from 'hono'
import { cors } from 'hono/cors'
import user from './routes/userRoute'
import blog from './routes/blogRoute'

const app = new Hono().basePath('/api/v1')

app.use('*', cors())

app.route('/user', user)

app.route('/blog', blog)

export default app
