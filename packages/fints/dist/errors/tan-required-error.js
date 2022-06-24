"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TanRequiredError = void 0;
class TanRequiredError extends Error {
    constructor(message, transactionReference, challengeText, challengeMedia, dialog) {
        super(message);
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        this.challengeMedia = challengeMedia;
        this.dialog = dialog;
    }
}
exports.TanRequiredError = TanRequiredError;
//# sourceMappingURL=tan-required-error.js.map