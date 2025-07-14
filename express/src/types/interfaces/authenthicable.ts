export interface authenthicable {
    createAuthenthicable(credential: string, password: string, otherProperties: Record<string, any>): authenthicable;
    getTableName(): string;
    getCredentialName(): string;
    getCredential(): string;
    getPassword(): string;
    checkIfExists(): Promise<boolean>;
    register(): Promise<number>;
}
