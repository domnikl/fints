"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HITAN = exports.HITANProps = void 0;
const parse_1 = require("../parse");
const segment_1 = require("./segment");
class HITANProps {
}
exports.HITANProps = HITANProps;
class HITAN extends (0, segment_1.SegmentClass)(HITANProps) {
    constructor() {
        super(...arguments);
        this.type = "HITAN";
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    deserialize(input) {
        if (![6].includes(this.version)) {
            throw new Error(`Unimplemented TAN method version ${this.version} encountered.`);
        }
        const [[process], [transactionHash], [transactionReference], [challengeText], ...challengeHhdUc] = input;
        this.process = parse_1.Parse.num(process);
        this.transactionHash = transactionHash;
        this.transactionReference = transactionReference;
        this.challengeText = challengeText;
        if (challengeHhdUc.length > 0) {
            [this.challengeMediaType, this.challengeMedia] = parse_1.Parse.challengeHhdUc(challengeHhdUc);
        }
    }
}
exports.HITAN = HITAN;
//# sourceMappingURL=hitan.js.map