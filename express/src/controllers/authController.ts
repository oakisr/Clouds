import type { Request, Response, NextFunction, Middleware } from "../types"; // Types
import { User } from "../models";
import { authentication, validate, Errors } from "../../modules"

/**
 * Register a new user
 */
export const registerUser: Middleware[] = [
    validate(User.body.email, User.body.password, User.body.name),
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;
        const user = new User(email, password, name);
        const userID: number = await authentication.register(user);
        if (!userID) return next(Errors.badRequest("User registration failed."));
        res.status(200).json(userID);
    }
];

/**
 * Verify admin credentials and return a JWT token.
 * It requires a JWT secret key to be present in the environment variables.
 */
export const loginUser: Middleware[] = [
    validate(User.body.email, User.body.password),
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = new User(email, password);
        const userToken: string = await authentication.login(user);
        if (!userToken) return next(Errors.notFound("User not found or invalid credentials."));
        res.json(userToken);
    }
];

/**
 * Remove a user
 */
export const removeUser: Middleware[] = [
    validate(User.param.id),
    async (req: Request, res: Response, _next: NextFunction) => {


        // // Compare given and stored authorization key
        // const { adminPin, authorizationKey } = req.body;
        // console.log(authKey);
        // console.log(authorizationKey);
        // const isKeyCorrect = await bcrypt.compare(authorizationKey, authKey);
        // if (!isKeyCorrect) {
        //     return next(new ExpectedError('Authorization key is invalid', 400));
        // }
        //
        // // Remove admin profile from database
        // const response = await db.execute('DELETE FROM admin WHERE admin_pin = ?', [adminPin]);
        // console.log(response.affectedRows.toString());
        // res.json(response.affectedRows.toString());
        res.json({ message: "Removing user " + req.params.id });
    }
];


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


