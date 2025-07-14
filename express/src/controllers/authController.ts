import type { Request, Response, NextFunction, Middleware } from "../types"; // Types
import { User } from "../models";
import { authentication, validate, Errors } from "../../modules"

/**
 * Register a new admin account with a hashed credential and return the admin pin.
 * It requires an authorization key to be present in the environment variables.
 */
// export const registerUser: Middleware[] = [
//     validate(User.body.name, User.body.email, User.body.password),
//     async (req: Request, res: Response, next: NextFunction) => {
//         const { name, email, password } = req.body;
//         const authenthicableUser = new User().createAuthenthicable(email, password, { name });
//         const newUser: object = await authentication.register(authenthicableUser);
//         if (!newUser) {
//             return next(Errors.badRequest);
//         }
//         res.status(200).json(newUser);
//
//     }
// ];

/**
 * Verify admin credentials and return a JWT token.
 * It requires a JWT secret key to be present in the environment variables.
 */
// static login: Middleware[] = [
//     validate(adminPin, credential),
//     async (req: Request, res: Response, next: NextFunction) => {
//
//             // Verify if JWT secret key is present
//             if (jwtSecret === undefined) {
//                 console.log("here")
//                 return next(Errors.unauthorizedAccess);
//
//             }
//             // Query admin profile from database
//             const { adminPin, credential } = req.body;
//             const searchResult: Admin = await db.queryOne('SELECT * FROM admin WHERE admin_pin = ?', [adminPin]);
//             if (!searchResult) {
//                 return next(Errors.badRequest);
//             }
//
//             // Compare credential from database with input
//             const isCredentialCorrect = await bcrypt.compare(credential, searchResult.credential);
//             if (!isCredentialCorrect) {
//                 return next(Errors.badRequest);
//             }
//
//             // Create and respond with JWT token
//             const token = jwt.sign({ adminPin: searchResult.admin_pin }, jwtSecret, { expiresIn: '1h' });
//             res.json({ token: token });
//         }
// ];


//
//     /**
//      * Remove an admin account and return the number of affected rows.
//      */
//     static remove: Middleware[] = [
//         validate(adminPin, authorizationKey),
// async (req: Request, res: Response, next: NextFunction) => {
//                 // Verify if authorization key is present
//                 if (authKey === undefined) {
//                     return next(new ExpectedError('Unauthorized access', 401));
//                 }
//
//                 // Compare given and stored authorization key
//                 const { adminPin, authorizationKey } = req.body;
//                 console.log(authKey);
//                 console.log(authorizationKey);
//                 const isKeyCorrect = await bcrypt.compare(authorizationKey, authKey);
//                 if (!isKeyCorrect) {
//                     return next(new ExpectedError('Authorization key is invalid', 400));
//                 }
//
//                 // Remove admin profile from database
//                 const response = await db.execute('DELETE FROM admin WHERE admin_pin = ?', [adminPin]);
//                 console.log(response.affectedRows.toString());
//                 res.json(response.affectedRows.toString());
//             }
//     ];
//
//     /**
//      * Middleware to authenticate the user.
//      * It verifies the JWT token and sets the adminID in the request object.
//      */
//     static authenticate: Middleware = async (req: Request, _res: Response, next: NextFunction) => {
//             // Verify if JWT secret key is present
//             if (!jwtSecret) {
//                 return next(new ExpectedError('Unauthorized access', 401));
//             }
//
//             // Verify if authorization header is present
//             if (!req.headers['authorization']) {
//                 return next(new ExpectedError('Unauthorized access', 401));
//             }
//
//             // Verify for token in the  header
//             const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer TOKEN"
//             if (!token) {
//                 return next(new ExpectedError('No token provided', 401));
//             }
//
//             // Verify the token with the secret key
//             try {
//                 const decoded = jwt.verify(token, jwtSecret);
//                 if (typeof decoded === 'object' && decoded !== null && 'adminPin' in decoded) {
//                     req.adminID = decoded.adminPin;
//                     next();
//                 } else {
//                     return next(new ExpectedError('Invalid token payload', 401));
//                 }
//             } catch (error) {
//                 if (error instanceof jwt.TokenExpiredError) {
//                     return next(new ExpectedError('JWT token has expired', 401));
//                 } else if (error instanceof jwt.JsonWebTokenError) {
//                     // Catch other JWT related errors, e.g., token being malformed
//                     return next(new ExpectedError('Invalid JWT token', 401));
//                 }
//                 // For other types of errors, pass them to the next error handler
//                 return next(new ExpectedError('Error' + error, 401));
//             }
//         }


