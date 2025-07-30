import type { Authenticable } from "./Authenticable";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Errors } from "../index";
import { jwtSecret } from "../../src/constants";
import { BaseModel } from "../../src/models/BaseModel";
import { SQLRepository } from "../../src/repositories";

// Load environment variables
const authKey: string | undefined = process.env.AUTHORIZATION_KEY;

// Number of salt rounds for hashing
const saltRounds = 10;

const isTaken = async <T extends BaseModel & Authenticable>(subject: T): Promise<void> => {
    const model = subject.constructor as typeof BaseModel;

    if (subject.email) {
        const emailExists = await SQLRepository.checkIfExists(model.getTableName(), "email", subject.email);
        if (emailExists) throw Errors.conflict('The email is already in use.');
    } else if (subject.username) {
        const usernameExists = await SQLRepository.checkIfExists(model.getTableName(), "username", subject.username);
        if (usernameExists) throw Errors.conflict('The username is already in use.');
    } else {
        throw Errors.badRequest('Email or username is required.');
    }
};


export const register = async <T extends BaseModel & Authenticable>(subject: T): Promise<number> => {
    const model = subject.constructor as typeof BaseModel;

    // Verify if subject it's already registered
    await isTaken(subject)

    // Hash password
    subject.password = await bcrypt.hash(subject.password, saltRounds);

    // Register subject into the database and return its new ID
    return await model.insert(subject);
};

export const login = async (subject: Authenticable): Promise<number> => {
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

