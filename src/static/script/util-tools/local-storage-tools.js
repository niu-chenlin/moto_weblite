class LocalStorageTools {
    static setAuthInfo(k,v) {
        localStorage.setItem(k, v);
    }
    static getAuthInfo(k) {
        localStorage.getItem(k);
    }
    static clearAuthInfo() {
        localStorage.clear();
    }
}