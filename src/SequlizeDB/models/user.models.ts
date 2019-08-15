import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {TB_NAMES} from "../table.enum";
import {UserRoleModels} from "./user.role.models";

@Table({tableName: TB_NAMES.USER})
export class UserModels extends Model<UserModels> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        field: "ID"
    })
    id: string;
    @ForeignKey(()=> UserRoleModels)
    @Column
    roleId: number;
    @Column
    name: string;
    @Column
    sex: number;
    @Column
    status: string;
    @Column
    loginName: string;
    @Column
    phone: string;
    @Column
    password: string;
    @Column
    email: string;
    @Column
    type: string;
    @Column
    createTime: Date;
    @Column
    updateTime: Date;
    @Column
    lastLoginTime: Date;
}