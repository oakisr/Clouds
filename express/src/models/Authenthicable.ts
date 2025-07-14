import type { authenthicable } from "../types";

export class Authenthicable implements authenthicable {
    credential: string;
    password: string;


    constructorc(credential: string, password: string, otherProperties: Record<string, any>): authenthicable {
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

}