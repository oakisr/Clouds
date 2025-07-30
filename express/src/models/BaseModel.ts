import { SQLRepository } from "../repositories";

export abstract class BaseModel {
    static tableName: string;

    static getTableName(): string {
        return this.tableName;
    }

    static getAll(): Promise<any[]> {
        return SQLRepository.getAll(this.getTableName());
    }

    static get(value: number | string, attribute: string = 'id'): Promise<any> {
        return SQLRepository.get(this.getTableName(), value, attribute);
    }

    static insert(subject: any): Promise<number> {
        return SQLRepository.insert(this.getTableName(), subject);
    }
}