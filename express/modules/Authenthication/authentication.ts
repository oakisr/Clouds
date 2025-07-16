import type { authenthicable } from "../../src/types";
import { SQLite } from "../SQLite";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Errors } from "../index";
import { jwtSecret } from "../../src/constants";


// Load environment variables
const authKey: string | undefined = process.env.AUTHORIZATION_KEY;

// Number of salt rounds for hashing
const saltRounds = 10;

export const register = async (subject: authenthicable): Promise<number> => {
    // Verify if subject is in fact authenthicable
    console.log('subject', subject);
    if (!subject.isAuthenthicable()) {
        throw Errors.badRequest('The subject is not authenthicable.');
    }

    // Verify if subject login credential is already taken
    if (await subject.checkIfExists()) {
        throw Errors.conflict('The ' + subject.getLoginType() + ' is already in use.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(subject.getPassword(), saltRounds);

    // Register subject into the database and return its new ID
    return await subject.register(hashedPassword);
};

export const login = async (subject: authenthicable): Promise<number> => {
    // Verify if JWT secret key is present
    if (!jwtSecret) throw Errors.forbidden();
    return Promise.resolve(0)

    // // Compare credential from database with input
    // const isCredentialCorrect = await bcrypt.compare(credential, searchResult.credential);
    // if (!isCredentialCorrect) {
    //     return next(Errors.badRequest);
    // }
    //
    // // Create and respond with JWT token
    // const token = jwt.sign({ adminPin: searchResult.admin_pin }, jwtSecret, { expiresIn: '1h' });
};

