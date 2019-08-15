import {buildErrorResp} from "../ApiError/ApiResponse";
import {Errors} from "../ApiError/MotorError";
import {SessionAction} from "./sessionAction";
import {ApiUser} from "./user";

class CheckResult {
    errorNo: number;
    errorLog: string;

    constructor(errorNo, msg) {
        this.errorNo = errorNo;
        this.errorLog = msg;
    }
}
let ApiModules = [
    ApiUser
];

async function apiDispatcher(ctx) {
    let args = ctx.request.body;
    let api = args["api"];
    if (!api) {
        let resp = buildErrorResp(Errors.RET_NO_SUCH_API, "api not specified");
        ctx.body = JSON.stringify(resp);
        return
    }

    if(this.checkToken(args["token"])) {
        let resp = buildErrorResp(Errors.RET_INVALID_TOKEN, "bad token of " + args["token"]);
        ctx.body = JSON.stringify(resp);
        return;
    }
    let doApi = args[api].split('.');
    return doApi[0].doApi[1]()
}
function checkToken(args): Promise<boolean> {
    let api = args["api"];
    if (api == "motor.user.register" || api == "motor.user.login" || api == "motor.user.logout") {
        return new Promise(function (resolve) {
            return resolve(true);
        });
    }
    if (!args["token"]) {
        return new Promise(function (resolve) {
            return resolve(false);
        });
    }
    return SessionAction.getSession(args["token"]).then(function (session) {
        if(session){
            args["paras"]["session"] = session;
            return true;
        } else {
            return false;
        }
    }).catch(function (error) {
        return false;
    });
}
