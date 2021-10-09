/// <reference types="node" />
export declare class HITANProps {
    segNo: number;
    process: number;
    transactionHash: string;
    transactionReference: string;
    challengeText: string;
    challengeMediaType: string;
    challengeMedia: Buffer;
}
declare const HITAN_base: import("..").Constructable<HITANProps & import("./segment").Segment<HITANProps>>;
export declare class HITAN extends HITAN_base {
    type: string;
    protected serialize(): string[][];
    protected deserialize(input: string[][]): void;
}
export {};
