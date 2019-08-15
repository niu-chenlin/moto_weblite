
export interface ErrorInterface {
    errorNo: number;
    errorMsg: string;
    errorLog?: string;
}

export class MotorError implements ErrorInterface{
    errorNo: number;
    errorMsg: string;
    errorLog: string = "";

    constructor(errorNo?: number) {
        this.errorNo = errorNo;
        this.errorLog = "";
        this.errorMsg = Error_d2s(errorNo);
    }
}

export enum Errors {
    RET_SUCCESS = 0,

    RET_NO_SUCH_API = 1,
    RET_INVALID_PARAS = 2,
    RET_DB_ERR = 3,
    RET_SYSTEM_ERR = 4,
    RET_NO_API_KEY = 5,

    RET_INVALID_TOKEN = 6,
    RET_ITEM_NOT_EXIST = 7,
    RET_ITEM_ALREADY_EXIST = 8,
    RET_PASSWORD_NOT_MATCH = 9,
    RET_ROOT_USER_PROTECTED = 10,

    RET_SESSION_EXPIRED = 11,
    RET_INVALID_SIGNATURE = 12,
    RET_WX_LOGIN_ERR = 13,
    RET_BIKE_NOT_READY = 14,
    RET_BIKE_NOT_EXIST = 15,

    RET_BIKE_ALREADY_RENT = 16, // 16-20
    RET_BIKE_DISABLED = 17,
    RET_BIKE_NOT_ONLINE = 18,
    RET_BIKE_LACK_BATTERY = 19,
    RET_BIKE_IN_FAILURE = 20,

    RET_RECHARGE_ERROR = 21, // 21-25
    RET_REFUND_ERROR = 22,
    RET_NOT_IMPLEMENTED = 23,
    RET_CREATE_SESSION_ERR = 24,
    RET_NOT_ENOUGH_BALANCE = 25,

    RET_USER_DISABLED = 26, // 26-30
    RET_BIKEMODEL_NOT_FREE = 27,
    RET_BIKE_DISCONNECTED = 28,
    RET_USER_HAS_UNFINISHED_ORDER = 29,
    RET_INVALID_CAPTCHA = 30,

    RET_BIKE_SIGNAL_LOW = 31, //31-35
    RET_USER_NOT_BIND_PHONE = 32,

    RET_ERROR_OBJ_STRUCTRUE = 33,
    RET_ERROR_PROMOTION_DISABLED = 34,
    RET_ERROR_PROMOTION_OUT_OF_DATE = 35,

    RET_ERROR_PROMOTION_OUT_OF_USER = 36, //36-40
    RET_FAIL_SEND_SMS = 37,
    RET_PROMOTION_TYPE_ERROR = 38,
    RET_PROMOTION_EMPTY = 39,
    RET_QRCODE_BUSY = 40,

    RET_NO_ENOUGH_AMOUNT_REFUND = 41,
    RET_ALIOSS_PUT_FAILED = 42,
    RET_ACCOUNT_ALREADY_EXIST = 43,
    RET_ACCOUNT_NOT_EXIST = 44,
    RET_PASS_ERROR = 45,

    RET_KTAPI_ERROR = 46,
    RET_NO_STARTTIME = 47,
    RET_NO_ENDTIME = 48,
    RET_TIME_RANGE_TOO_BIG = 49,
    RET_FAILED_TO_CREATE_DIR = 50,

    RET_NO_BIKE_TRACE = 51,
    RET_FAILED_TO_ZIP = 52,
    RET_ACCOUNT_ROLE_ERROR = 53,
    RET_ITEM_BE_USED = 54,

    RET_MAX_ERR
}

export const ErrorMsgs = [
    "执行命令成功", // 0

    "该API未定义", // 1-5
    "非法的参数",
    "数据库操作错误",
    "系统错误",
    "API密钥验证错误",

    "无效的Token", // 6-10
    "操作对象不存在",
    "对象已存在",
    "用户不存在或密码不匹配",
    "根用户保护，不能删除",

    "会话已超时", // 11-15
    "无效的签名",
    "从微信登录失败",
    "车辆暂时不可用",
    "车辆不存在",

    "车辆已经出租", // 16-20
    "车辆已停用",
    "车辆不在线",
    "车辆电量不足",
    "车辆发生故障，正在维护中",

    "充值失败", // 21-25
    "退款失败",
    "该功能尚未实现",
    "新建会话失败",
    "您的余额不足，请充值后重试",

    "用户已被禁用，请联系管理员", // 26-30
    "该车辆型号被使用中",
    "车辆无法连接",
    "您有未结束订单",
    "错误的验证码",

    "车辆信号弱，暂不能使用", //31-35
    "用户未绑定手机",
    "错误的数据结构",
    "优惠活动已禁用",
    "不在优惠活动日期内",

    "不在优惠活动用户群", //36-40
    "发送短信失败",
    "活动类型不匹配",
    "活动优惠券耗尽",
    "当前二维码正忙",

    "没有足够金额完成退款", //41-45
    "alioss 上传失败",
    "账号已占用",
    "账号不存在",
    "账号密码异常",

    "KTAPI返回异常",//46-50
    "开始时间无效",
    "结束时间无效",
    "时间区间太长",
    "目录创建失败",

    "无有效车辆Trace",//51-55
    "压缩文件失败",
    "用户权限异常",
    "对象已被使用",

    "MAX ERROR NUMBER"
];

export const ErrorEnMsgs = [
    "CMD Success", // 0

    "No Such API Defined", // 1-5
    "Invalid Paras",
    "Database Error",
    "System Error",
    "API Key Not Specified",

    "Invalid Token", // 6-10
    "Item Not Exist",
    "Item Already Exist",
    "User Not Exist or Password Not Match",
    "Root User Protected, Cannot Remove",

    "Session Expired", // 11-15
    "Invalid Signature",
    "Login From WeiXin Error",
    "Bike Not Ready",
    "Bike Not Exist",

    "Bike Already Rent", // 16-20
    "Bike Disabled",
    "Bike Not Online",
    "Bike Lack Battery",
    "Bike In Failure",

    "Recharge Failed", // 21-25
    "Refund Failed",
    "Operation Not Supported",
    "Create Session Failed",
    "Not Enough Balance",

    "User Disabled，Please Connect Administrator", // 26-30
    "Bike Model Not Free",
    "Bike Disconnected",
    "You Have Unfinished Order",
    "Incorrect Captcha",

    "Bike signal strength low",//31-35
    'User not bind phone',
    'Illegal obj structure',
    'promotion disabled',
    'promotion out of date',

    'has no access of promotion',//36-40
    'failed to send sms',
    'promotion type not match',
    "promotion coupons empty",
    'QRCode is busy',
    "MAX ERROR NUMBER"
];

export function Error_d2s(errorNo) {
    if (errorNo > Errors.RET_MAX_ERR) {
        return ErrorMsgs[Errors.RET_MAX_ERR];
    } else {
        return ErrorMsgs[errorNo];
    }
}
export class APIError extends Error{
    errorNo: Errors;
    constructor(errorNo: Errors, msg?: string) {
        super(msg);
        this.errorNo = errorNo
    }
}