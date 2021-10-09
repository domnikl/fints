import { Command } from "clime";
import { BaseConfig } from "../config";
export default class extends Command {
    execute({ verbose, json, serializer, ...config }: BaseConfig): Promise<void>;
}
