import {ApiResponse, buildErrorResp, buildSuccessResp} from "../ApiError/ApiResponse";
import {UserAction} from "../apiAction/userAction";
import {Errors} from "../ApiError/MotorError";

export async function add_user(paras: any): Promise<ApiResponse> {
    try {
        await UserAction.addUser(paras);
        return buildSuccessResp();
    } catch (e) {
        return buildErrorResp(e.errorNo || Errors.RET_DB_ERR, e.message);
    }
}
export async function login_user(paras: any): Promise<ApiResponse> {
    try {
        let ret = await UserAction.loginUser(paras);
        return buildSuccessResp({
            cookie: JSON.parse(ret.cookie),
            token: ret.id,
            userId: ret.userId,
            role: ret.userType,
            username: ret.userName
        });
    } catch (e) {
        return buildErrorResp(e.errorNo || Errors.RET_DB_ERR, e.message);
    }
}
export async function logout_user(paras: any): Promise<ApiResponse> {
    try {
        await UserAction.logoutUser(paras.token);
        return buildSuccessResp();
    } catch (e) {
        return buildErrorResp(Errors.RET_DB_ERR, e.message);
    }
}
export async function edit_user_pwd(paras: any): Promise<ApiResponse> {
    try {
        await UserAction.editUserPwd(paras.token);
        return buildSuccessResp();
    } catch (e) {
        return buildErrorResp(Errors.RET_DB_ERR, e.message);
    }
}