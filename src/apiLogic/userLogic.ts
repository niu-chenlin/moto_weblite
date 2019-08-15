import {ApiResponse, buildErrorResp, buildSuccessResp} from "../ApiError/ApiResponse";
import {UserAction} from "../apiAction/userAction";
import {Errors} from "../ApiError/MotorError";

export async function add_user(paras: any): Promise<ApiResponse> {
    try {
        await UserAction.addUser(paras);
        return buildSuccessResp();
    } catch (e) {
        return buildErrorResp(Errors.RET_DB_ERR, e.message);
    }
}