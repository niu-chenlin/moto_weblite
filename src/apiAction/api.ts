import {buildErrorResp} from "../ApiError/ApiResponse";
import {Errors} from "../ApiError/MotorError";
import {SessionAction} from "./sessionAction";
import {ApiUser} from "../apiModules/user";

class CheckResult {
    errorNo: number;
    errorLog: string;

    constructor(errorNo, msg) {
        this.errorNo = errorNo;
        this.errorLog = msg;
    }
}
let ApiModuleMap = {};
let ApiListMap = {};
let ApiModules = [
    ApiUser
];

async function apiDispatcher(ctx) {
    let args = ctx.request.body;
    let api = args["api"];
    if (!api) {
        let resp = buildErrorResp(Errors.RET_NO_SUCH_API, "api not specified");
        ctx.body = JSON.stringify(resp);
        return;
    }
    let apiProto = ApiListMap[api];
    if(apiProto) {
        if(!await checkToken(args)) {
            let resp = buildErrorResp(Errors.RET_INVALID_TOKEN, "bad token of " + args["token"]);
            ctx.body = JSON.stringify(resp);
            return;
        }
        return apiProto["service"](args["paras"]).then(function(resp) {
            resp.updateErrorMsg();
            ctx.body = JSON.stringify(resp);
        })
    } else {
        let resp = buildErrorResp(Errors.RET_NO_SUCH_API, apiProto + "not exist");
        ctx.body = JSON.stringify(resp);
    }

}
function checkToken(args): Promise<boolean> {
    let api = args["api"];
    if (api == "user.APIAddUser" || api == "motor.user.login" || api == "motor.user.logout") {
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

function initApis() {
    for(let apiModules of ApiModules) {
        for(let api of apiModules["apis"]) {
            let apiKey = apiModules["module"]+ "." + api["key"];
            ApiListMap[apiKey] = api;
        }
    }
}

export {apiDispatcher, initApis}