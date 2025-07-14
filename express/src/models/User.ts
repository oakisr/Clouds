import type { authenthicable, Get, Insert } from "../types";
import { body as _body, param as _param } from "express-validator";
import { INVALID } from "../constants";
import { SQLRepository } from "../repositories";

export class User implements authenthicable {
    static tableName = "user";
    id?: number;
    name: string = "";
    email: string = "";
    password: string = "";

    // Authenthicable methods

    createAuthenthicable(credential: string, password: string, otherProperties: Record<string, any>): authenthicable {
        const authenthicableUser = new User();
        authenthicableUser.email = credential;
        authenthicableUser.password = password;
        if('name' in otherProperties) {
            authenthicableUser.name = otherProperties.name;
        }
        return authenthicableUser;
    }

    getTableName(): string {
        return User.tableName;
    }

    getCredentialName(): string {
        return "email";
    }

    getCredential(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    async checkIfExists(): Promise<boolean> {
        return !!(await SQLRepository.checkIfExists(this));
    }

    async register(): Promise<number> {
        return Promise.resolve(0);
    }

    // Validation rules

    static param = {
        id: _param("id")
            .notEmpty().withMessage(INVALID.required)
            .isInt({ min: 1 }).withMessage(INVALID.positiveInteger)
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
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
    };

    // Api Methods

    static get: Get<User> = SQLRepository.functionGet<User>(this.tableName);
    static insert: Insert<User> = SQLRepository.functionInsert<User>(this.tableName);

}