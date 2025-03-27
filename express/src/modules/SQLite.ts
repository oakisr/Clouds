import sqlite3 from "sqlite3";
import { createPool, Pool } from 'generic-pool';
import { fileSystem } from "./fileSystem";

/**
 * @class SQLite management module.
 * @classdesc Provides static methods for executing SQL queries against an SQLite database.
 * This class abstracts the details of database interactions and connection pool management,
 * allowing for simplified database operations. It manages a connection pool internally,
 * initializing and utilizing it as needed without manual intervention required from the user.
 * @remarks Ensure to call SQLite.shutdownPool() if you need to
 * cleanly shut down the pool when your application is terminating.
 * @property {Pool<sqlite3.Database> | null} _pool - The connection pool for the SQLite database.
 */
export class SQLite {
    private static _pool: Pool<sqlite3.Database> | null = null; // Initialize _pool as possibly null

    /**
     * Initializes the connection pool for the SQLite database.
     * @return void
     */
    static _initPool() {
        const factory = {
            create: function () {
                return new Promise<sqlite3.Database>((resolve, reject) => {
                    const db = new sqlite3.Database(fileSystem.USERS_DB, sqlite3.OPEN_READWRITE, (error) => {
                        if (error) {
                            console.error('SQLite connection error:', error);
                            reject(error);
                        } else {
                            resolve(db);
                        }
                    });
                });
            },
            destroy: function (db: sqlite3.Database) {
                return new Promise<void>((resolve) => {
                    db.close(() => {
                        resolve();
                    });
                });
            }
        };

        SQLite._pool = createPool(factory, {
            max: 10, // Maximum size of the pool
            min: 2 // Minimum size of the pool
        });
    }

    /**
     * Acquires a connection from the pool.
     * @return Promise<sqlite3.Database> - A promise that resolves with a database connection
     */
    static async acquire() {
        if (SQLite._pool === null) {
            SQLite._initPool();
        }
        // Use non-null assertion operator as we are sure _pool is not null here
        return await SQLite._pool!.acquire();
    }

    /**
     * Releases a connection back to the pool.
     * @param db - The connection to release
     * @return Promise<void> - A promise that resolves when the connection is released
     */
    static async release(db: sqlite3.Database) {
        // Use non-null assertion operator as we are sure _pool is not null here
        await SQLite._pool!.release(db);
    }

    /**
     * Shuts down the connection pool.
     *
     * This method first waits for all borrowed connections to be returned to the pool (drain).
     * Once all connections are back in the pool, it then closes all active connections (clear).
     * This ensures that the application can shut down cleanly without leaving any database connections open.
     * @return Promise<void> - A promise that resolves when the pool is shut down
     */
    static async shutdownPool() {
        if (SQLite._pool) {
            await SQLite._pool.drain().then(() => {
                return SQLite._pool!.clear();
            });
        }
    }

    /**
     * Executes a SQL SELECT statement that returns multiple rows.
     * @param statement - SQL SELECT statement, potentially with placeholders (?)
     * @param params - Optional array of parameters to match placeholders in the SQL statement
     * @return Promise<any[]> - A promise that resolves with an array of rows
     */
    static async queryAll(statement: string, params: any[] = []): Promise<any[]> {
        const db = await SQLite.acquire();
        return new Promise((resolve, reject) => {
            db.all(statement, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                SQLite.release(db).catch(console.error);
            });
        });
    }


    /**
     * Executes a SQL SELECT statement that returns a single row.
     * @param statement - SQL SELECT statement
     * @param values - An array of parameter values
     * @return Promise<any> - A promise that resolves with a single row
     */
    static async queryOne(statement: string, values: any[]): Promise<any> {
        const db = await SQLite.acquire();
        return new Promise((resolve, reject) => {
            db.get(statement, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
                SQLite.release(db).catch(console.error);
            });
        });
    }

    /**
     * Executes a SQL INSERT statement for multiple rows.
     * Returns an array of IDs of the last inserted rows.
     * @param statement - SQL INSERT statement
     * @param valuesArray - An array of parameter value arrays
     * @return Promise<insertedIds> - A promise that resolves with an array of IDs of the last inserted rows
     */
    static async insertAll(statement: string, valuesArray: any[][]): Promise<{ insertedIds: number[] }> {
        const db = await SQLite.acquire();
        return new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', async (transactionError) => {
                if (transactionError) {
                    reject(transactionError);
                    return;
                }

                let insertedIds: number[] = [];

                for (const values of valuesArray) {
                    db.run(statement, values, function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        // Retrieve the last inserted ID for each insertion
                        insertedIds.push(this.lastID);
                    });
                }

                db.run('COMMIT', (commitError) => {
                    if (commitError) {
                        reject(commitError);
                    } else {
                        resolve({ insertedIds: insertedIds });
                    }
                    SQLite.release(db).catch(console.error);
                });
            });
        });
    }

    /**
     * Executes a SQL INSERT statement for a single row.
     * Returns the ID of the last inserted row.
     * @param statement - SQL INSERT statement
     * @param values - An array of parameter values
     * @return Promise<number> - A promise that resolves with the ID of the last inserted row
     */
    static async insertOne(statement: string, values: any[]): Promise<number> {
        const db = await SQLite.acquire();
        return new Promise((resolve, reject) => {
            db.run(statement, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
                SQLite.release(db).catch(console.error);
            });
        });
    }

    /**
     * Executes a SQL UPDATE or DELETE statement.
     * Returns the number of affected rows.
     * @param statement - SQL UPDATE or DELETE statement
     * @param values - An array of parameter values
     * @return Promise<affectedRows> - A promise that resolves with the number of affected rows
     */
    static async execute(statement: string, values: any[]): Promise<{ affectedRows: number }> {
        const db = await SQLite.acquire();
        return new Promise((resolve, reject) => {
            db.run(statement, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ affectedRows: this.changes });
                }
                SQLite.release(db).catch(console.error);
            });
        });
    }
}
