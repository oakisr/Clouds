/**
 * @module paths
 * @description This module provides global access to the absolute path of a resource folder.
 */
import path from 'path';
import { RELATIVE_PATHS } from '../src/constants';  // Correct import for the default class


export const fileSystem = new Proxy<{ [key: string]: string }>( {}, {
    get(target, prop: string) {
        if (prop in RELATIVE_PATHS) {
            return path.join(__dirname, RELATIVE_PATHS[prop as keyof typeof RELATIVE_PATHS]);
        }
        return undefined; // or throw an error if the path doesn't exist
    }
});