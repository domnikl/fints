import { Options } from "clime";
import { PinTanClientConfig } from "fints";
export declare class BaseConfig extends Options implements PinTanClientConfig {
    productId: string;
    url: string;
    name: string;
    pin: string;
    blz: string;
    debug: boolean;
    verbose: boolean;
    json: boolean;
    get serializer(): {
        (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
        (value: any, replacer?: (string | number)[], space?: string | number): string;
    };
}
