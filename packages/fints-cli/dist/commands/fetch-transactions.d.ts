import { Command } from "clime";
import { BaseConfig } from "../config";
export declare class FetchStatementOptions extends BaseConfig {
    iban: string;
    start: string;
    end: string;
}
export default class extends Command {
    execute({ verbose, json, serializer, iban, start, end, ...config }: FetchStatementOptions): Promise<void>;
}
