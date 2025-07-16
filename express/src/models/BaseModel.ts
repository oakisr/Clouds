export abstract class BaseModel {
    static tableName: string;

    static getTableName(): string {
        return this.tableName;
    }
}