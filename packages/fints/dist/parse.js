"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
const date_fns_1 = require("date-fns");
const fast_xml_parser_1 = require("fast-xml-parser");
const iconv_lite_1 = require("iconv-lite");
/**
 * A set of utilities for parsing data from the fints data formats.
 */
exports.Parse = {
    /**
     * Parse a boolean (JN).
     *
     * @param str The string to parse.
     *
     * @return The parsed boolean.
     */
    bool(str) {
        if (str === "J") {
            return true;
        }
        return false;
    },
    /**
     * Parse a number.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    num(str) {
        if (typeof str === "undefined") {
            return;
        }
        return Number(str.replace(/,/, "."));
    },
    /**
     * Parse a set of digits.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    dig(str) {
        if (str === "0") {
            return 0;
        }
        while (str.startsWith("0")) {
            str = str.substr(1, str.length);
        }
        return Number(str);
    },
    /**
     * Parse a date.
     *
     * @param str The string or date to parse.
     *
     * @return The parsed date.
     */
    date(str) {
        return (0, date_fns_1.parse)(str, "yyyyMMdd", new Date());
    },
    /**
     * Parse a xml document to an object.
     *
     * @param str The xml parse.
     *
     * @return The parsed object.
     */
    xml(str) {
        return (0, fast_xml_parser_1.parse)(str);
    },
    challengeHhdUc(str) {
        // tslint:disable-next-line:max-line-length
        // Documentation: https://www.hbci-zka.de/dokumente/spezifikation_deutsch/hhd/Belegungsrichtlinien%20TANve1.5%20FV%20vom%202018-04-16.pdf
        // II.3
        // Matrix-Format:
        // 2 bytes = length of mime type
        // mime type as string
        // 2 bytes = length of data
        if (str && str[0]) {
            const buffer = (0, iconv_lite_1.encode)(str[0][0], "ISO-8859-1");
            const mediaTypeLength = buffer.readUIntBE(0, 2);
            const mediaType = buffer.toString("utf8", 2, 2 + mediaTypeLength);
            const imageLength = buffer.readUIntBE(2 + mediaTypeLength, 2);
            return [mediaType, buffer.slice(2 + mediaTypeLength + 2, 2 + mediaTypeLength + 2 + imageLength)];
        }
        else {
            return ["", Buffer.alloc(0)];
        }
    },
};
//# sourceMappingURL=parse.js.map