import type { Get, Insert } from "../types";
import { body as _body, param as _param } from "express-validator";
import { INVALID } from "../constants";
import { SQLRepository } from "../repositories";
import { BaseModel } from "./BaseModel";
import { Errors } from "../../modules";

export interface authenthicable {
    isAuthenthicable(): boolean;
    getLoginType(): "username" | "email";
    getLogin(): string;
    getPassword(): string;
    checkIfExists(): Promise<boolean>;
    checkCredentials(): Promise<any>;
    register(HashedPassword: string): Promise<number>;
}

interface AuthenticatableModelClass<T> {
    getTableName(): string;
    get(value: string, attribute?: string): Promise<T>;
    insert(subject: T): Promise<number>;
}

function addAuthenticationMethods<T extends { [key: string]: any }>(
    model: AuthenticatableModelClass<T>,
    instance: T,
    loginType: "username" | "email"
) {
    const proto = Object.getPrototypeOf(instance);

    proto.isAuthenthicable = function () {
        return !!(this.getLogin?.() && this.getPassword?.());
    };

    proto.getLoginType = function () {
        return loginType;
    };

    proto.getLogin = function () {
        return this[loginType] as string;
    };

    proto.getPassword = function () {
        return this.password!;
    };

    proto.checkIfExists = async function () {
        return !!(await SQLRepository.checkIfExists(model.getTableName(), this));
    };

    proto.checkCredentials = async function () {
        return await model.get(this.getLogin?.(), this.getLoginType?.());
    };

    proto.register = async function (HashedPassword: string) {
        this.password = HashedPassword;
        return await model.insert(this);
    };
}


export class User extends BaseModel {
    static tableName = "user";
    id?: number;
    name: string = "";
    email: string = "";
    password: string = "";

    constructor(email: string, password: string, properties?: Record<string, any>) {
        super();
        this.email = email;
        this.password = password;
        if (properties?.name) this.name = properties.name;
        addAuthenticationMethods(User, this, "email");
    }

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

    something(): string {
        return "huhu";
    }

    static get: Get<User> = SQLRepository.functionGet<User>(this.getTableName());
    static insert: Insert<User> = SQLRepository.functionInsert<User>(this.getTableName());
}
