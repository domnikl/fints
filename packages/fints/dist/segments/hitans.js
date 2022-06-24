"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HITANS = exports.HITANSProps = void 0;
const parse_1 = require("../parse");
const segment_1 = require("./segment");
const tan_method_1 = require("../tan-method");
class HITANSProps {
}
exports.HITANSProps = HITANSProps;
class HITANS extends (0, segment_1.SegmentClass)(HITANSProps) {
    constructor() {
        super(...arguments);
        this.type = "HITANS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        if (![1, 2, 3, 4, 5, 6, 7].includes(this.version)) {
            throw new Error(`Unimplemented TAN method version ${this.version} encountered.`);
        }
        const [[maxRequests], [minSignatures], [securityClass], args,] = input;
        const [oneStepAllowed, multiple, securityProfile, ...restArgs] = args;
        let tanMethodArgs;
        if (this.version === 1) {
            tanMethodArgs = restArgs.slice(1);
        }
        else {
            tanMethodArgs = restArgs;
        }
        this.maxRequests = parse_1.Parse.num(maxRequests);
        this.minSignatures = parse_1.Parse.num(minSignatures);
        this.securityClass = parse_1.Parse.num(securityClass);
        this.oneStepAllowed = parse_1.Parse.bool(oneStepAllowed);
        this.securityProfile = parse_1.Parse.num(securityProfile);
        this.multiple = parse_1.Parse.bool(multiple);
        const tanMethodArgumentsLength = tan_method_1.tanMethodArgumentMap.get(this.version).length;
        this.tanMethods = [];
        for (let i = 0; i < tanMethodArgs.length; i += tanMethodArgumentsLength) {
            const currentArgs = tanMethodArgs.slice(i, i + tanMethodArgumentsLength);
            this.tanMethods.push(new tan_method_1.TanMethod(this.version, currentArgs));
        }
    }
}
exports.HITANS = HITANS;
//# sourceMappingURL=hitans.js.map