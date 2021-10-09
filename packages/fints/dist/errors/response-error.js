"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError extends Error {
    constructor(response) {
        const errors = response.errors.join(", ");
        super(`Error(s) in dialog: ${errors}.`);
        this.response = response;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=response-error.js.map