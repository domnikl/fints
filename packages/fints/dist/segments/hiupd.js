"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class HIUPDProps {
}
exports.HIUPDProps = HIUPDProps;
/**
 * HISPA (SEPA-Kontoverbindung rückmelden)
 * Section C.10.1.3
 */
class HIUPD extends segment_1.SegmentClass(HIUPDProps) {
    constructor() {
        super(...arguments);
        this.type = "HIUPD";
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    deserialize(input) {
        const [[accountNumber], // [accountNumber, subAccount, a, blz]
        [iban], [], // [clientId]
        [], // [accountType]
        [], // [accountCurrency]
        [accountOwnerName1], // [accountOwnerName1]
        [], // [accountOwnerName2]
        [accountName], [, limitValue],] = input;
        this.account = { accountNumber, iban, accountOwnerName1, accountName, limitValue };
    }
}
exports.HIUPD = HIUPD;
//# sourceMappingURL=hiupd.js.map