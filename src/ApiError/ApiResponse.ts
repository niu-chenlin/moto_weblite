import {Error_d2s, Errors, MotorError} from "./MotorError";

export class ApiResponse {
    errorObj: MotorError;
    data: any;

    constructor(errorNo: number, data?: any) {
        this.errorObj = new MotorError(errorNo);
        this.data = data ? data: null;
    }

    updateErrorMsg() {
        this.errorObj.errorMsg = Error_d2s(this.errorObj.errorNo);
    }
}
export function buildSuccessResp(data?: any) {
    let resp = new ApiResponse(Errors.RET_SUCCESS, null);
    resp.data = data;
    return resp;

}

export function buildErrorResp(errorNo, errorLog) {
    let resp = new ApiResponse(errorNo);
    resp.errorObj.errorLog = errorLog ? errorLog:"";
    resp.errorObj.errorNo = errorNo;
    resp.errorObj.errorMsg = Error_d2s(errorNo);
    resp.data = null;
    return resp;
}

export function buildApiResp(errorNo, data, errorLog?) {
    let resp = new ApiResponse(errorNo);
    resp.errorObj.errorLog = errorLog ? errorLog:"";
    resp.errorObj.errorNo = errorNo;
    resp.errorObj.errorMsg = Error_d2s(errorNo);
    resp.data = data;
    return resp;
}