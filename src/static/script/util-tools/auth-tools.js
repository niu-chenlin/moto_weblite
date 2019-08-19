const Base64 = require("js-base64");

const AUTH_NAME = 'MOTOR_AUTH';
class AuthTools {
    static setAuthInfo(user) {
        let jsonData = JSON.stringify(user);
        let base64Data = Base64.encode(jsonData);
        localStorage.setItem(AUTH_NAME, base64Data)
    }
    static getAuthInfo() {
        let base64Data = localStorage.getItem(AUTH_NAME) ;
        let jsonData = Base64.decode(base64Data);
        return JSON.parse(jsonData);
    }
    static clearAuthInfo() {
        localStorage.clear();
    }
}
exports.AuthTools = AuthTools;