import * as Moment from "moment";
import {Base64} from "js-base64";
import {Md5} from "ts-md5";

export function getMilliSeconds() {
    return Moment.now();
}
export function b64_encode(src) {
    return Base64.encode(src);
}

export function b64_decode(src) {
    return Base64.decode(src);
}
export function getEncPassword(plain: string): string {
    return Md5.hashStr("my" + plain + "motor") as string;
}