import type { authenthicable } from "../../src/types";
import { SQLite } from "../SQLite";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Errors } from "../index";


// Load environment variables
const authKey: string | undefined = process.env.AUTHORIZATION_KEY;
const jwtSecret: string | undefined = process.env.JWT_SECRET_KEY;

// Number of salt rounds for hashing
const saltRounds = 10;

export const register = async (subject: authenthicable): Promise<number> => {
    // Verify if subject is in fact authenthicable
    if (!subject.isAuthenthicable()) {
        throw Errors.badRequest('The subject is not authenthicable.');
    }

    // Verify if subject login credential is already taken
    if(await subject.checkIfExists()) {
        throw Errors.conflict('The ' + subject.getLoginType() + ' is already in use.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(subject.getPassword(), saltRounds);

    // Register subject into the database and return its new ID
    return await subject.register(hashedPassword);
};