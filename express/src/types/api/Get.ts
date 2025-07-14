/**
 * GenericGet one record by ID.
 */
export type Get<T> = (id: number) => Promise<T>;