import { Response } from "../response";
export declare class ResponseError extends Error {
    response: Response;
    constructor(response: Response);
}
