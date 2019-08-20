import {UserModels, UserRoleModels} from "../SequlizeDB/models";
import {APIError, Errors} from "../ApiError/MotorError";
import {getMilliSeconds, getEncPassword, b64_decode} from "../utils/utils";
import {SessionModels} from "../SequlizeDB/models/session.models";
import {SessionAction} from "./sessionAction";

export interface addUserFilter {
    name: string,
    password: string,
    phone: string,
    sex: number
}
export interface loginUserFilter{
    password: string,
    phone: string
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
            where: {phone},
            include: [{model: UserRoleModels}]
        })
    }
    /**
     * 用户注册
     * @param {addUserFilter} param
     * @returns {Promise<void>}
     */
    public static async addUser(param: addUserFilter) {
        let pUser = await this.getUserByPhone(param.phone);
        if(pUser) {
            throw new APIError(Errors.RET_ITEM_ALREADY_EXIST, "用户已存在");
        }
        return UserModels.create<UserModels>({
            name: param.name,
            password: getEncPassword(b64_decode(param.password)),
            phone: param.phone,
            sex: param.sex,
            createTime: getMilliSeconds(),
            updateTime: getMilliSeconds()
        })
    }

    /**
     * 登录
     * @param {loginUserFilter} param
     * @returns {Promise<SessionModels>}
     * @constructor
     */
    public static async loginUser(param: loginUserFilter) {
        let pUser: UserModels = await this.getUserByPhone(param.phone);
        if(!pUser) {
            throw new APIError(Errors.RET_ITEM_NOT_EXIST, "用户不存在");
        }
        if(pUser.password !== getEncPassword(b64_decode(param.password))) {
            throw new APIError(Errors.RET_PASS_ERROR, "密码错误");
        }
        await UserModels.update({
            lastLoginTime: getMilliSeconds()
        }, {
            where: {id: pUser.id}
        });
        return await SessionAction.insertSession({
            userId: pUser.id,
            username: pUser.name,
            role: {
                id: pUser['role.id'],
                roleType: pUser['role.roleType'],
                authority: pUser['role.authority']
            }
        })
    }

    /**
     * 退出登录
     * @param {string} tooken
     * @returns {Bluebird<number>}
     */
    public static async logoutUser(tooken: string) {
        return await SessionModels.destroy({
            where: {id: tooken}
        });
    }
}