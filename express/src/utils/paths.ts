/**
 * @module paths
 * @description This module provides global access to the absolute path of a resource folder or a file.
 */

import path from 'path';
import { RELATIVE_PATHS } from './constants';  // Correct import for the default class

/**
 * @function getFolder - Get the absolute path of a resource folder.
 * @param type - The type of resource.
 * @returns {string} The absolute path of the resource folder.
 */
export const getFolder = (type: keyof typeof RELATIVE_PATHS): string => {
    return path.join(__dirname, RELATIVE_PATHS[type]);
};

/**
 * @function getFile - Get the absolute path of a file or a resource folder.
 * @param type - The type of resource.
 * @param filename - Optional filename.
 * @returns {string} The absolute path of the file.
 */
export const getFile = (type: keyof typeof RELATIVE_PATHS, filename?: string): string => {
    const relativePath = RELATIVE_PATHS[type];
    if (!relativePath) {
        throw new Error('Invalid typeOfPath');
    }

    if (filename) {
        return path.join(__dirname, relativePath, filename);
    } else {
        return path.join(__dirname, relativePath);
    }
};

/**
 * @function pathTo - Get the absolute path of a file within a resource folder.
 * @param type - The type of resource.
 * @param filename - The filename.
 * @returns {string} The absolute path to the file.
 */
export const pathTo = (type: keyof typeof RELATIVE_PATHS, filename: string): string => {
    return getFile(type, filename);
};

/**
 * Path constants - You can access paths directly from here.
 */
export const USERS_DB = getFolder('USERS_DB');
