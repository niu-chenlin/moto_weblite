import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {TB_NAMES} from "../table.enum";
import {UserModels} from "./user.models";

@Table({tableName: TB_NAMES.SESSION})
export class SessionModels extends Model<SessionModels> {
    @Column({
        primaryKey: true,
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4
    })
    id: string;
    @ForeignKey(()=> UserModels)
    @Column
    userId: string;
    @Column
    userType: number;
    @Column
    userName: string;
    @Column
    cookie: string;
    @Column
    createTime: number;
    @Column
    expireTime: number;
    @Column
    updateTime: number;
}