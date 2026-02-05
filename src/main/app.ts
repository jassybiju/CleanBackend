import  express from "express";
import loginRouter from '../infrastructure/http/routes/auth.routes'
import postRouter from '../infrastructure/http/routes/post.routes'
import commentRouter from '../infrastructure/http/routes/comment.routes'
import cors from 'cors'
import cookieParser from "cookie-parser";

export const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',loginRouter)
app.use('/api/',postRouter)
app.use('/api/',commentRouter)


app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

