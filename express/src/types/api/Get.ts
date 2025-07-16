/**
 * GenericGet one record by ID.
 */
export type Get<T> = (value: number | string, attribute?: string) => Promise<T>;