import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDb');
})
    .catch((e) => {
        console.log(`Connection failed with this error: ${e}`);
    })
const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
})

app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})