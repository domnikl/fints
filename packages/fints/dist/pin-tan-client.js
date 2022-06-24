"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinTanClient = void 0;
const client_1 = require("./client");
const dialog_1 = require("./dialog");
const request_1 = require("./request");
const http_connection_1 = require("./http-connection");
const constants_1 = require("./constants");
class PinTanClient extends client_1.Client {
    constructor(config) {
        super();
        this.config = config;
        const { url, debug } = config;
        this.connection = new http_connection_1.HttpConnection({ url, debug });
    }
    createDialog(dialogConfig) {
        const { blz, name, pin, productId = constants_1.PRODUCT_NAME } = this.config;
        const { connection } = this;
        return new dialog_1.Dialog(dialogConfig ? dialogConfig : { blz, name, pin, systemId: "0", productId }, connection);
    }
    createRequest(dialog, segments, tan) {
        const { blz, name, pin } = this.config;
        const { systemId, dialogId, msgNo, tanMethods } = dialog;
        return new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments, tanMethods, tan });
    }
}
exports.PinTanClient = PinTanClient;
//# sourceMappingURL=pin-tan-client.js.map