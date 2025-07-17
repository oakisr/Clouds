import type { authenthicable } from "../types";
import { SQLite } from "../../modules";

// Generic CRUD operations for SQLite database

export const getAll = async <T>(tableName: string): Promise<T[]> => {
    return SQLite.queryAll(`SELECT *
                            FROM ${tableName}`);
};

export const get = async <T>(tableName: string, value: number | string, attribute: string = 'id' ): Promise<T> => {
    return SQLite.query(`SELECT *
                         FROM ${tableName}
                         WHERE ${attribute} = ?`, [value]);
};

export const insert = async <T extends object>(
    tableName: string,
    subject: T
): Promise<number> => {
    const columns = Object.keys(subject).join(', ');
    const values = Object.values(subject);
    const placeholders = values.map(() => '?').join(', ');

    console.log(columns);

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

export const remove = async (tableName: string, id: number): Promise<number> => {
    return SQLite.execute(`DELETE
                           FROM ${tableName}
                           WHERE id = ?`, [id]);
};

export const checkIfExists = async (tableName:string, subject: authenthicable): Promise<any> => {
    return SQLite.query(`SELECT 1
                         FROM ${tableName}
                         WHERE ${subject.getLoginType()} = ?`, [subject.getLogin()]);
};


// Generic higher-order functions for CRUD operations

export const functionGet = <T>(tableName: string) => {
    return async (value: number | string, attribute: string = 'id'): Promise<T> => {
        return get<T>(tableName, value, attribute);
    };
};

export const functionInsert = <T extends object>(tableName: string) => {
    return async (subject: T): Promise<number> => {
        return insert<T>(tableName, subject);
    };
};

// export const functionUpdate = <T extends object>(tableName: string) => {
//     return async (id: number, newData: T): Promise<number> => {
//         return update<T>(tableName, id, newData);
//     };
// };

// export const functionPatch = <T extends object>(tableName: string) => {
//     return async (id: number, updates: Partial<T>): Promise<number> => {
//         return patch<T>(tableName, id, updates);
//     };
// };

// export const functionRemove = (tableName: string) => {
//     return async (id: number): Promise<number> => {
//         return remove(tableName, id);
//     };
// };
