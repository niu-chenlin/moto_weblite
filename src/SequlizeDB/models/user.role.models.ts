import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {TB_NAMES} from "../table.enum";

@Table({tableName: TB_NAMES.USER_ROLE})
export class UserRoleModels extends Model<UserRoleModels> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        field: "ID"
    })
    id: number;
    @Column
    roleType: string;
    @Column
    authority: string;
}