/**
 * Insert a new record of type T.
 */
export type Insert<T> = (subject: T) => Promise<number>;