"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpConnection = exports.ConnectionConfig = void 0;
require("isomorphic-fetch");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
const response_1 = require("./response");
/**
 * Configuration specifying how to reach the fints server.
 */
class ConnectionConfig {
    constructor() {
        /**
         * If set to `true`, will log all requests performed and responses received.
         */
        this.debug = false;
    }
}
exports.ConnectionConfig = ConnectionConfig;
/**
 * A connection used by clients to reach the fints server.
 */
class HttpConnection extends ConnectionConfig {
    constructor(config) {
        super();
        Object.assign(this, config);
    }
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = this;
            (0, logger_1.verbose)(`Sending Request: ${request}`);
            if (this.debug) {
                (0, logger_1.verbose)(`Parsed Request:\n${request.debugString}`);
            }
            const httpRequest = yield fetch(url, {
                method: "POST",
                body: (0, utils_1.encodeBase64)(String(request)),
            });
            if (!httpRequest.ok) {
                throw new Error(`Received bad status code ${httpRequest.status} from FinTS endpoint.`);
            }
            const responseString = (0, utils_1.decodeBase64)(yield httpRequest.text());
            (0, logger_1.verbose)(`Received Response: ${responseString}`);
            const response = new response_1.Response(responseString);
            if (this.debug) {
                (0, logger_1.verbose)(`Parsed Response:\n${response.debugString}`);
            }
            return response;
        });
    }
}
exports.HttpConnection = HttpConnection;
//# sourceMappingURL=http-connection.js.map