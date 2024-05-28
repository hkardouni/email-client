import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import {OAuth2Client} from 'google-auth-library'

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





const oAuth2Client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
})

app.get('/api/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    res.redirect(authUrl);
  });

  app.get('/api/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      const accessToken = tokens.access_token;
      
      res.send('Authentication successful! You can now make requests to the Gmail API.');
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
      res.status(500).send('Error exchanging authorization code for access token');
    }
  });