import type { authenthicable } from "../types";
import { SQLite } from "../../modules";

// Generic CRUD operations for SQLite database

export const getAll = async (tableName: string): Promise<any[]> => {
    return SQLite.queryAll(`SELECT *
                            FROM ${tableName}`);
};

export const get = async (tableName: string, value: number | string, attribute: string = 'id'): Promise<any> => {
    return SQLite.query(`SELECT *
                         FROM ${tableName}
                         WHERE ${attribute} = ?`, [value]);
};

export const insert = async (
    tableName: string,
    subject: Record<string, any>
): Promise<number> => {
    const columns = Object.keys(subject).join(', ');
    const values = Object.values(subject);
    const placeholders = values.map(() => '?').join(', ');

    return SQLite.insert(
        `INSERT INTO ${tableName} (${columns})
         VALUES (${placeholders})`,
        values
    );
};

// export const update = async <T extends object>(
//     tableName: string,
//     id: number,
//     newData: T
// ): Promise<number> => {
//     const columns = Object.keys(newData).map(key => `${key} = ?`).join(', ');
//     const values = Object.values(newData);
//
//     return SQLite.updateOne(
//         `UPDATE ${tableName} SET ${columns} WHERE id = ?`,
//         [...values, id]
//     );
// };

// export const patch = async <T extends object>(
//     tableName: string,
//     id: number,
//     updates: Partial<T>
// ): Promise<number> => {
//     const columns = Object.keys(updates).map(key => `${key} = ?`).join(', ');
//     const values = Object.values(updates);
//
//     return SQLite.updateOne(
//         `UPDATE ${tableName} SET ${columns} WHERE id = ?`,
//         [...values, id]
//     );
// };

export const remove = async (tableName: string, value: number | string, attribute: string = 'id'): Promise<number> => {
    return SQLite.execute(`DELETE
                           FROM ${tableName}
                           WHERE ${attribute} = ?`, [value]);
};

export const checkIfExists = async (tableName: string, loginType: "username" | "email", login: string): Promise<any> => {
    return SQLite.query(`SELECT 1
                         FROM ${tableName}
                         WHERE ${loginType} = ?`, [login]);
};

