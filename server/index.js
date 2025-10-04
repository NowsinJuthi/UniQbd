import 'dotenv/config'
import mongoose from 'mongoose'
import { MONGO_URI, PORT } from "./src/config/config.js"
import app from './app.js'


mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database connected")

        app.listen(PORT, () => {
            console.log(`server running ${PORT}`)
        })
    })

    .catch((error) => {
        console.log(`Database error`, error)
    })