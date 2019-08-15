import {Sequelize} from "sequelize-typescript";
import {SeqConfig} from "./config";
import {UserModels} from "./models";
import {UserRoleModels} from "./models/user.role.models";

let initSeq = function() {
    let sequelize = new Sequelize(SeqConfig);
    sequelize.addModels([UserModels, UserRoleModels]);
    return sequelize;
};

export class SequelizeDB {
    private static sequelize: Sequelize;
    public static init() {
        this.sequelize = initSeq();
    }
    public static get() {
        return this.sequelize;
    }
}
export * from './models';