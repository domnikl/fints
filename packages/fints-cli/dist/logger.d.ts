import * as Winston from "winston";
export declare function setLevel(isVerbose: boolean): void;
export declare const logger: Winston.Logger;
export declare const verbose: Winston.LeveledLogMethod;
export declare const info: Winston.LeveledLogMethod;
export declare const warn: Winston.LeveledLogMethod;
export declare const error: Winston.LeveledLogMethod;
