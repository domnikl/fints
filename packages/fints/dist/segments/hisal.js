"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HISAL = exports.HISALProps = void 0;
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HISALProps {
}
exports.HISALProps = HISALProps;
/**
 * HISAL (Saldenrückmeldung)
 * Section C.2.1.2.2
 */
class HISAL extends (0, segment_1.SegmentClass)(HISALProps) {
    constructor() {
        super(...arguments);
        this.type = "HISAL";
    }
    serialize() {
        throw new Error("Not implemented.");
    }
    deserialize(input) {
        const [[iban, bic, accountNumber, _country, subAccount, blz], [productName], [_currency], [type, booked, currency, _date],] = input;
        this.account = { accountNumber, subAccount, blz, iban, bic };
        this.productName = productName;
        this.currency = currency;
        this.bookedBalance = parse_1.Parse.num(booked);
        this.pendingBalance = parse_1.Parse.num("0");
        this.creditLimit = parse_1.Parse.num("0");
        this.availableBalance = parse_1.Parse.num("0");
        if (type === "D") {
            this.bookedBalance *= -1;
        }
    }
}
exports.HISAL = HISAL;
//# sourceMappingURL=hisal.js.map