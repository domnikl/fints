"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIKAZ = exports.HIKAZProps = void 0;
const segment_1 = require("./segment");
class HIKAZProps {
}
exports.HIKAZProps = HIKAZProps;
/**
 * HIKAZ (Kontoumsätze rückmelden/Zeitraum)
 * Section C.2.1.1.1.1
 */
class HIKAZ extends (0, segment_1.SegmentClass)(HIKAZProps) {
    constructor() {
        super(...arguments);
        this.type = "HIKAZ";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [bookedTransactions, pendingTransactions] = input;
        if (pendingTransactions && pendingTransactions[0]) {
            this.pendingTransactions = pendingTransactions[0];
        }
        if (bookedTransactions && bookedTransactions[0]) {
            this.bookedTransactions = bookedTransactions[0];
        }
    }
}
exports.HIKAZ = HIKAZ;
//# sourceMappingURL=hikaz.js.map