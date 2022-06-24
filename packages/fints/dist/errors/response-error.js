"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(response) {
        const errors = response.errors.join(", ");
        super(`Error(s) in dialog: ${errors}.`);
        this.response = response;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=response-error.js.map