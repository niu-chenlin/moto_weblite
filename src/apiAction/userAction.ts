import {UserModels} from "../SequlizeDB/models";
import {APIError, Errors} from "../ApiError/MotorError";

export interface addUserFilter {
    name: string,
    password: string,
    phone: string,
    sex: number
}
export class UserAction {
    /**
     * 通过手机号查询用户
     * @param {string} phone
     * @returns {Bluebird<UserModels | null>}
     */
    public static async getUserByPhone(phone: string) {
        return UserModels.findOne({
            raw: true,
            where: {phone}
        })
    }
    /**
     * 用户注册
     * @param {addUserFilter} param
     * @returns {Promise<void>}
     */
    public static async addUser(param: addUserFilter) {
        let pUser = this.getUserByPhone(param.phone);
        if(pUser) {
            throw new APIError(Errors.RET_ITEM_ALREADY_EXIST, "用户已存在");
        }
        let user = new UserModels(param);
        await user.save();
    }
}