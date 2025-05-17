
import express, { Request, Response } from 'express'
const PORT = 5000

const app = express()

app.get('/', (req: Request, res: Response)=> {
    res.send("Hello world")
})


app.listen(PORT, ()=> {
    return console.log(`listening on ${PORT}`)
})