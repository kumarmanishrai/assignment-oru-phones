
import express, { Request, Response } from 'express'
import session from "express-session";
import dotenv from 'dotenv'
import bodyParser = require('body-parser');
import cors from 'cors'
import mongo from './db/admindb'
import UserRouter from './route/userRouter';
import AdminRouter from './route/adminRouter';
import cookieParser from 'cookie-parser'
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis'

dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: [`${process.env.CLIENT_API}`],
        methods: ['GET','HEAD', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }))
const redisClient = new Redis(`${process.env.REDIS_URL}`);
redisClient.on('connect', ()=> console.log("connected to redis"))
redisClient.on('error', (err)=> console.error("Redis error: ", err))

export default redisClient
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "admin:"
})

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
mongo.on('error', console.error.bind(console, "MongoDB connection error"))
mongo.once('open', function(){
	console.log("mongodb connected successfully");
})



app.get('/', (req: Request, res: Response)=> {
    res.send("Hello world")
})


AdminRouter(app);

UserRouter(app);



app.listen(PORT, ()=> {
    return console.log(`listening on ${PORT}`)
})
