import type { Authenticable } from "./Authenticable";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Errors } from "../index";
import { jwtSecret } from "../../src/constants";
import { BaseModel } from "../../src/models/BaseModel";
import { SQLRepository } from "../../src/repositories";


const getLoginType = (subject: Authenticable): "username" | "email" => {
    if (subject.email) {
        return "email";
    }
    if (subject.username) {
        return "username";
    }
    throw Errors.badRequest('Email or username is required.');
};

const isTaken = async (subject: BaseModel & Authenticable): Promise<void> => {
    const model = subject.constructor as typeof BaseModel;
    const loginType = getLoginType(subject);
    const taken = await SQLRepository.checkIfExists(model.getTableName(), loginType, subject[loginType]!);
    if (taken) throw Errors.conflict('The ' + loginType + ' is already in use.');
};

export const register = async (subject: BaseModel & Authenticable): Promise<number> => {
    // Verify if subject it's already registered
    await isTaken(subject)

    // Hash password
    const saltRounds = 10;
    subject.password = await bcrypt.hash(subject.password, saltRounds);

    // Register subject into the database and return its new ID
    const model = subject.constructor as typeof BaseModel;
    return await model.insert(subject);
};

export const login = async (subject: BaseModel & Authenticable): Promise<string> => {
    // Verify if JWT secret key is present
    if (!jwtSecret) throw Errors.forbidden();

    // Get subject's credentials from the database using email or username
    const model = subject.constructor as typeof BaseModel;
    const loginType = getLoginType(subject);
    const subjectCredentials = await model.get(subject[loginType]!, loginType);
    if (!subjectCredentials) throw Errors.notFound("The email or username does not exist.");

    // Compare credential from database against the input
    const isCredentialCorrect = await bcrypt.compare(subject.password, subjectCredentials.password);
    if (!isCredentialCorrect) throw Errors.unauthorized('Invalid ' + loginType + ' or password.');

    // Create and respond with JWT token
    return jwt.sign({ loginType: subjectCredentials[loginType] }, jwtSecret, { expiresIn: '1h' });
};

