import {ApiResponse, buildErrorResp, buildSuccessResp} from "../ApiError/ApiResponse";
import {Errors} from "../ApiError/MotorError";
import {SessionAction} from "../apiAction/sessionAction";

export async function web_get_session(paras: any): Promise<ApiResponse> {
    try {
        await SessionAction.getSession(paras);
        return buildSuccessResp();
    } catch (e) {
        return buildErrorResp(Errors.RET_DB_ERR, e.message);
    }
}