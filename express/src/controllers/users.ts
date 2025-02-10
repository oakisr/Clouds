import { AsyncMiddleware } from '../types';
import { searchUser} from "../dal/users";

export const newUser: AsyncMiddleware = async (req, res, _next) => {
    res.send('New user created hi');
};

export const testUser: AsyncMiddleware = async (req, res, _next) => {
    const user = await searchUser("klelto");
    res.status(200).json(user);
};