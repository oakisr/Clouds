import SQLite from "../services/SQLite";
import { User } from "../types";

// const fakeUser: User = {
//     id: 54,
//     name: "tt",
//     email: "cushi"
// };

export const searchUser = async (name: string = ''): Promise<User[]> => {
    return await SQLite.queryOne('SELECT * FROM user WHERE name = ?', [name]);
};
