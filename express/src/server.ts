import express from 'express';
import { PORT } from "./constants";
import cors from 'cors';
import * as routers from './routes';
import { notFoundHandler, errorHandler } from '../modules';

// Application setup
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Range', 'Content-Length', 'Content-Type'],
}));

app.use(express.json());

// Routes setup
app.use('/api/auth', routers.authRouter);
app.use('/api/users', routers.userRouter);
app.use(notFoundHandler);
app.use(errorHandler);

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
