import type { authenthicable } from "../src/types";
import { SQLite } from "./SQLite";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Errors } from "./index";


// Load environment variables
const authKey: string | undefined = process.env.AUTHORIZATION_KEY;
const jwtSecret: string | undefined = process.env.JWT_SECRET_KEY;

// Number of salt rounds for hashing
const saltRounds = 10;

// export const register = async (subject: authenthicable): Promise<number> => {
//     // Verify if credential already exists
//     if(await subject.checkIfExists()) {
//         throw Errors.conflict('The email is already in use.');
//     }
//
//     // Create hashed credential and insert into database
//     const newHashedCredential = await bcrypt.hash(subject.getCredential(), saltRounds);
//     // const newAdminPin = await subject.insert(subject);
//     // return newAdminPin.toString();
// };