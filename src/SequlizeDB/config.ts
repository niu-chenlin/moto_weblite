import {SequelizeConfig} from "sequelize-typescript/lib/types/SequelizeConfig";
// let isDev: boolean = process.env.NODE_ENV === "development";
export const SeqConfig: SequelizeConfig = {
    database: "dbmotor",
    dialect: "mysql",
    host: "rm-2zeg7939i55o5k1r9zo.mysql.rds.aliyuncs.com",
    username: "root",
    password: "root",
    timezone:'+8:00'
};