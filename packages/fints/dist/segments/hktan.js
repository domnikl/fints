"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HKTAN = exports.HKTANProps = void 0;
const segment_1 = require("./segment");
class HKTANProps {
}
exports.HKTANProps = HKTANProps;
/**
 * HKTAN (TAN-Verfahren festlegen)
 * Section B.5.1
 */
class HKTAN extends (0, segment_1.SegmentClass)(HKTANProps) {
    constructor() {
        super(...arguments);
        this.type = "HKTAN";
    }
    deserialize() {
        throw new Error("Not implemented.");
    }
    serialize() {
        const { process, segmentReference, aref, medium, version } = this;
        if (!["2", "4"].includes(process)) {
            throw new Error(`HKTAN process ${process} not implemented.`);
        }
        if (![3, 4, 5, 6].includes(version)) {
            throw new Error(`HKTAN version ${process} not implemented.`);
        }
        if (process === "4") {
            if (medium) {
                if (version === 3) {
                    return [process, segmentReference, "", "", "", "", "", "", medium];
                }
                if (version === 4) {
                    return [process, segmentReference, "", "", "", "", "", "", "", medium];
                }
                if (version === 5) {
                    return [process, segmentReference, "", "", "", "", "", "", "", "", "", medium];
                }
                if (version === 6) {
                    return [process, segmentReference, "", "", "", "", "", "", "", "", medium];
                }
            }
            else {
                if (version === 6) {
                    return [process, "HKIDN"];
                }
                else {
                    return [process];
                }
            }
        }
        else if (process === "2") {
            if (version === 6) {
                return [process, "", "", "", aref, "N"];
            }
            if (version === 5) {
                return [process, segmentReference, "", "", aref, "", "N"];
            }
            if (version === 3 || version === 4) {
                return [process, segmentReference, aref, "", "N"];
            }
        }
    }
}
exports.HKTAN = HKTAN;
//# sourceMappingURL=hktan.js.map