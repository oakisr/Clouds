export interface authenthicable {
    password: string;

    isAuthenthicable(): boolean;
    getLoginType(): "username" | "email";
    getLogin(): string;
    getPassword(): string;
    checkIfExists(): Promise<boolean>;
    register(newHashedLogin: string): Promise<number>;
}
