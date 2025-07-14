/**
 * Partially update an existing record by ID.
 */
export type Patch<T> = (id: number, subject: Partial<T>) => Promise<boolean>;