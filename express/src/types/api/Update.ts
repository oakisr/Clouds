/**
 * Update an existing record by ID with a full update.
 */
export type Update<T> = (id: number, subject: T) => Promise<boolean>;