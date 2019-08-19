
class PublicTools {
    static getErrorObj(error) {
        return JSON.parse(error);
    }
    static getDataObj(obj) {
        return JSON.parse(obj.data);
    }
}
exports.PublicTools = PublicTools;