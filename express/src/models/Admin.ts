import { BaseModel } from "./BaseModel";

export class Admin extends BaseModel {
    static tableName = "admin";
    id: number = 0;
    credential: string = "";
}
