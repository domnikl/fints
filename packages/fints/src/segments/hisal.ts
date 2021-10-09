import { SegmentClass } from "./segment";
import { SEPAAccount } from "../types";
import { Parse } from "../parse";

export class HISALProps {
    public segNo: number;
    public account: SEPAAccount;
    public productName: string;
    public currency: string;
    public bookedBalance: number;
    public pendingBalance: number;
    public creditLimit: number;
    public availableBalance: number;
}

/**
 * HISAL (Saldenrückmeldung)
 * Section C.2.1.2.2
 */
export class HISAL extends SegmentClass(HISALProps) {
    public type = "HISAL";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [ iban, bic, accountNumber, _country, subAccount, blz ],
            [ productName ],
            [ _currency ],
            [ type, booked, currency,  _date],
        ] = input;

        this.account = { accountNumber, subAccount, blz, iban, bic };
        this.productName = productName;
        this.currency = currency;
        this.bookedBalance = Parse.num(booked);
        this.pendingBalance = Parse.num('0');
        this.creditLimit = Parse.num('0');
        this.availableBalance = Parse.num('0');

        if (type == 'D') {
            this.bookedBalance *= -1;
        }
    }
}
