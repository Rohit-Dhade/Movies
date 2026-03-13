import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/' , (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', AuthRouter);


export default app;