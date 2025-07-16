/**
 * @module Constants
 * @description This module is a global collection of constant values used throughout the application such as server
 * settings, fileSystem, descriptions, etc. Helping maintain a single source of truth and simplifying configuration.
 */

// Configuration
export enum ENVIRONMENT { 'development', 'production' }
export const NODE_ENV: ENVIRONMENT = ENVIRONMENT.production;
export const PORT: number = 3000;

// Relative file paths
export const RELATIVE_PATHS = {
    USERS_DB: '../database/users.db',
};

// Validation messages
export const INVALID = {
    generic: ' is invalid, missing, or has incorrect format.',
    required: 'is required.',
    invalid: 'is invalid.',
    format: 'has an invalid format.',
    number: 'must be a number.',
    integer: 'must be an integer.',
    positiveInteger: 'must be a positive integer.',
    string: 'must be a string.',
}

// Authentication
//TODO: Move jwtSecret to a secure location, e.g. environment variable or aws secrets etc
export const jwtSecret: string = 'mousy';
