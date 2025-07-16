export interface authenthicable {
    password: string;

    isAuthenthicable(): boolean;
    getLoginType(): "username" | "email";
    getLogin(): string;
    getPassword(): string;
    checkIfExists(): Promise<boolean>;
    checkCredentials(): Promise<any>;
    register(newHashedLogin: string): Promise<number>;
}
