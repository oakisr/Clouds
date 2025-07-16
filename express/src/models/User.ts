import type { authenthicable, Get, Insert } from "../types";
import { body as _body, param as _param } from "express-validator";
import { INVALID } from "../constants";
import { SQLRepository } from "../repositories";
import { BaseModel } from "./BaseModel";

export class User extends BaseModel implements authenthicable {
    static tableName = "user";
    id?: number;
    name: string = "";
    email: string = "";
    password: string = "";

    constructor(...properties: string[]) {
        super();
        const [email, password, name] = properties;
        if (email) this.email = email;
        if (password) this.password = password;
        if (name) this.name = name;
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

    static get: Get<User> = SQLRepository.functionGet<User>(this.getTableName());
    static insert: Insert<User> = SQLRepository.functionInsert<User>(this.getTableName());

    // Authenthicable methods

    isAuthenthicable(): boolean {
        return !!(this.email && this.password);
    }

    getLoginType(): "username" | "email" {
        return "email";
    }

    getLogin(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    async checkIfExists(): Promise<boolean> {
        return !!(await SQLRepository.checkIfExists(User.getTableName(), this));
    }

    async register(HashedPassword: string): Promise<number> {
        this.password = HashedPassword;
        return await User.insert(this);
    }

}