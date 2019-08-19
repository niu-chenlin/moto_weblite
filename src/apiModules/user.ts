import {add_user, login_user} from "../apiLogic/userLogic";
import {PARAM_TYPE_STRING, PARAM_NOT_NULL, PARAM_TYPE_INT} from "../apiAction/config";

export const ApiUser = {
    "module": "user",
    "apis": [
        {
            "name": "添加账号",
            "key": "APIAddUser",
            "service": add_user,
            "paras": {
                "name": {
                    "type": PARAM_TYPE_STRING,
                    "desc": "姓名",
                    "default": PARAM_NOT_NULL
                },
                "password": {
                    "type": PARAM_TYPE_STRING,
                    "desc": "密码，Base64",
                    "default": PARAM_NOT_NULL
                },
                "phone": {
                    "type": PARAM_TYPE_STRING,
                    "desc": "Phone Number",
                    "default": ""
                },
                "sex": {
                    "type": PARAM_TYPE_INT,
                    "desc": "性别",
                    "default": 0
                }
            }
        },
        {
            "name": "登录",
            "key": "APILoginUser",
            "service": login_user,
            "paras": {
                "password": {
                    "type": PARAM_TYPE_STRING,
                    "desc": "密码，Base64",
                    "default": PARAM_NOT_NULL
                },
                "phone": {
                    "type": PARAM_TYPE_STRING,
                    "desc": "Phone Number",
                    "default": ""
                }
            }
        }
    ]

};