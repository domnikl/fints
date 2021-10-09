/// <reference types="node" />
import { Dialog } from "../dialog";
export declare class TanRequiredError extends Error {
    transactionReference: string;
    challengeText: string;
    challengeMedia: Buffer;
    dialog: Dialog;
    constructor(message: string, transactionReference: string, challengeText: string, challengeMedia: Buffer, dialog: Dialog);
}
