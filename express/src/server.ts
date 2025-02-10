import express, { Request, Response } from 'express';
import { PORT } from "./utils/constants";
import cors from 'cors';
import * as routes from './routes';

// Application setup
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Range', 'Content-Length', 'Content-Type'],
}));

app.use(express.json());

// Routes setup
app.get('/', (req: Request, res: Response) => {
    res.send('Hell, TypeScript with Express!');
});

app.use('/api/users', routes.users);

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
