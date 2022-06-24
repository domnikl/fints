"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HISPAS = exports.HISPASProps = void 0;
const segment_1 = require("./segment");
class HISPASProps {
    constructor() {
        this.painFormats = [];
    }
}
exports.HISPASProps = HISPASProps;
/**
 * HISPAS
 */
class HISPAS extends (0, segment_1.SegmentClass)(HISPASProps) {
    constructor() {
        super(...arguments);
        this.type = "HISPAS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[], [], [], [...painFormats],] = input;
        this.painFormats = painFormats.filter(x => x.indexOf("pain") !== -1);
    }
}
exports.HISPAS = HISPAS;
//# sourceMappingURL=hispas.js.map