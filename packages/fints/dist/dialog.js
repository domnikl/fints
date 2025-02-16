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
exports.Dialog = exports.DialogConfig = void 0;
const segments_1 = require("./segments");
const request_1 = require("./request");
const utils_1 = require("./utils");
const response_error_1 = require("./errors/response-error");
const tan_required_error_1 = require("./errors/tan-required-error");
const hitan_1 = require("./segments/hitan");
const constants_1 = require("./constants");
/**
 * Properties passed to configure a `Dialog`.
 */
class DialogConfig {
    constructor() {
        /**
         * The product ID that was assigned by ZKA
         */
        this.productId = constants_1.PRODUCT_NAME;
    }
}
exports.DialogConfig = DialogConfig;
/**
 * A dialog consisting of multiple related requests and responses.
 */
class Dialog extends DialogConfig {
    constructor(config, connection) {
        super();
        /**
         * All messages sent within a dialog are numbered.
         * This counter is kept here.
         */
        this.msgNo = 1;
        /**
         * A unique id for the dialog.
         * Assigned by the server as response to the initial request.
         * For the initial request a `0` needs to be sent.
         */
        this.dialogId = "0";
        /**
         * A list of allowed TAN methods as configured by the server.
         */
        this.tanMethods = [];
        /**
         * The server will only accept a certain version for the HISALS segment.
         * This version defaults to the latest version (6).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hisalsVersion = 6;
        /**
         * The server will only accept a certain version for the HIKAZS segment.
         * This version defaults to the latest version (6).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hikazsVersion = 6;
        /**
         * The server will only accept a certain version for the HICDB segment.
         * This version defaults to the latest version (1).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hicdbVersion = 1;
        this.hktanVersion = 1;
        /**
         * A list of supported SEPA pain-formats as configured by the server.
         */
        this.painFormats = [];
        Object.assign(this, config);
        this.connection = connection;
    }
    /**
     * Send a synchronization request to the server.
     * Only one synchronization is needed per dialog.
     * This is most likely the initial request sent.
     * It will be answered with the system's id and a list of supported TAN methods.
     * The supported HISALS and HIKAZS version can also be parsed from this request.
     *
     * @return The response as received by the server.
     */
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, systemId, dialogId, msgNo } = this;
            const segments = [
                new segments_1.HKIDN({ segNo: 3, blz, name, systemId: "0" }),
                new segments_1.HKVVB({ segNo: 4, productId: this.productId, lang: 0 }),
                new segments_1.HKSYN({ segNo: 5 }),
            ];
            const response = yield this.send(new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
            this.systemId = (0, utils_1.escapeFinTS)(response.systemId);
            this.dialogId = response.dialogId;
            this.hisalsVersion = response.segmentMaxVersion(segments_1.HISALS);
            this.hikazsVersion = response.segmentMaxVersion(segments_1.HIKAZS);
            this.hicdbVersion = response.segmentMaxVersion(segments_1.HICDBS);
            this.hktanVersion = response.segmentMaxVersion(segments_1.HITANS);
            this.tanMethods = response.supportedTanMethods;
            this.painFormats = response.painFormats;
            const hiupd = response.findSegments(segments_1.HIUPD);
            this.hiupd = hiupd;
            yield this.end();
        });
    }
    /**
     * Send the initializing request to the server.
     * The dialog is ready for performing custom requests afterwards.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, dialogId, msgNo, tanMethods } = this;
            const segments = [
                new segments_1.HKIDN({ segNo: 3, blz, name, systemId: "0" }),
                new segments_1.HKVVB({ segNo: 4, productId: this.productId, lang: 0 }),
            ];
            if (this.hktanVersion >= 6) {
                segments.push(new segments_1.HKTAN({ segNo: 5, version: 6, process: "4" }));
            }
            const response = yield this.send(new request_1.Request({ blz, name, pin, systemId: "0", dialogId, msgNo, segments, tanMethods }));
            this.dialogId = response.dialogId;
            return response;
        });
    }
    /**
     * End the currently open request.
     */
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, systemId, dialogId, msgNo } = this;
            const segments = [new segments_1.HKEND({ segNo: 3, dialogId })];
            yield this.send(new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
            this.dialogId = "0";
            this.msgNo = 1;
        });
    }
    /**
     * Send a custom request to the fints server and return the received response.
     *
     * @param request The request to send to the server.
     *
     * @return The response received from the server.
     */
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request.msgNo = this.msgNo;
            request.dialogId = this.dialogId;
            request.tanMethods = this.tanMethods;
            const response = yield this.connection.send(request);
            if (!response.success) {
                throw new response_error_1.ResponseError(response);
            }
            if (response.returnValues().has("0030")) {
                const hitan = response.findSegment(hitan_1.HITAN);
                throw new tan_required_error_1.TanRequiredError(response.returnValues().get("0030").message, hitan.transactionReference, hitan.challengeText, hitan.challengeMedia, this);
            }
            this.msgNo++;
            return response;
        });
    }
}
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map