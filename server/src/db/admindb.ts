import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

mongoose
    .connect(process.env.MONGO_URI as string)
    .catch((err: Error) => {
        console.log("connection error: " + err.message);
    })

const mongo = mongoose.connection

export default mongo