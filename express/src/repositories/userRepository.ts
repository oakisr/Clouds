import { SQLite } from "../modules";
import { User } from "../models";

// const fakeUser: User = {
//     id: 54,
//     name: "tt",
//     email: "cushi"
// };

export const getById = async (id: number = 0): Promise<User> => {
    return SQLite.queryOne('SELECT * FROM user WHERE id = ?', [id]);
};

export const getByIdPassword = async (id: number = 0): Promise<User> => {
    return SQLite.queryOne('SELECT * FROM user WHERE id = ?', [id]);
};

