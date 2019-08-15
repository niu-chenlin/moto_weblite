import {UserModels, UserRoleModels} from "../SequlizeDB/models";
import {SessionModels} from "../SequlizeDB/models/session.models";
import * as Moment from "moment";
const EXPIRE_TIMEOUT = (30 * 24 * 60 * 60 * 1000);
export interface SessionSeed {
    userId: string,
    username: string,
    role: UserRoleModels
}
export class SessionAction {
    /**
     * 查询Token
     * @param {string} id
     * @returns {Bluebird<UserModels | null>}
     */
    public static async getSession(id: string) {
        let session = await SessionModels.findOne({
            raw: true,
            where: {id}
        });
        if(!session) return null;
        if(session.expireTime <= Moment.now()) {
            await this.deleteSessionByID(id);
            return null;
        } else {
            await this.updateSessionById(id);
        }
        session.cookie = JSON.parse(session.cookie);
        return session;
    }
    public static async deleteSessionByID(id: string) {
        return SessionModels.destroy({
            where: {id}
        })
    }
    public static async updateSessionById(id: string) {
        return SessionModels.update({
            expireTime: Moment.now() + EXPIRE_TIMEOUT,
            updateTime: Moment.now()
        }, {
            where: {id}
        })
    }

    public static async deleteSessionByUserID(userId: string){
        return SessionModels.destroy({
            where: {userId: userId}
        })
    }
    public static async insertSession(seed: SessionSeed): Promise<SessionModels> {
        await SessionModels.destroy({
            where: {userId: seed.userId}
        });
        return SessionModels.create<SessionModels>({
            userId: seed.userId,
            userType: seed.role.id,
            userName: seed.username,
            cookie: JSON.stringify({
                "id": seed.userId,
                "username": seed.username,
                "role": seed.role.id
            }),
            createTime: Moment.now(),
            updateTime: Moment.now(),
            expireTime: (Moment.now() + EXPIRE_TIMEOUT)
        });
    }
}