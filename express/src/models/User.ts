import { body as _body, param as _param } from "express-validator";
import { INVALID } from "../constants";
import { BaseModel } from "./BaseModel";
import { Authenticable } from "../../modules/Authenthication/Authenticable";

export class User extends BaseModel implements Authenticable {
    static tableName = "user";

    constructor(public email: string, public password: string, public name?: string) {
        super();
    }

    // Validation attributes

    static param = {
        id: _param("id")
            .notEmpty().withMessage(INVALID.required)
            .isInt({ min: 1 }).withMessage(INVALID.positiveInteger),
    };

    static body = {
        name: _body("name")
            .trim()
            .notEmpty().withMessage(INVALID.required)
            .isString().withMessage(INVALID.string)
            .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long."),
        email: _body("email")
            .trim()
            .notEmpty().withMessage(INVALID.required)
            .isEmail().withMessage(INVALID.format),
        password: _body("password")
            .trim()
            .notEmpty().withMessage(INVALID.required)
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
    };
}