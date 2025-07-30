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

// // Testing
// import { User } from "./models/User";
// import { authentication } from "../modules"
// // User.get(1).then(result => console.log(result));
// // User.getAll().then(result => console.log(result));
// const user = new User("MMM@MM.com", "cuchi", "pumpkin");
// authentication.register(user).then(result => console.log(result));