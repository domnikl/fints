"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const segments_1 = require("./segments");
const utils_1 = require("./utils");
/**
 * A wrapper class for on-demand parsing a response received from the server.
 */
class Response {
    constructor(data) {
        this.segmentStrings = (0, utils_1.parse)(data);
        const hnvsd = this.findSegment(segments_1.HNVSD);
        if (hnvsd) {
            this.segmentStrings.push(...hnvsd.rawSegments);
        }
    }
    /**
     * Find all segments with the specified segment class.
     *
     * @param segmentClass A segment's class. The response should be searched for all segments with a matching type.
     *
     * @return An array of all matching segments. Can be empty if no segements matched the specified type.
     */
    findSegments(segmentClass) {
        const matchingStrings = this.segmentStrings.filter(str => str[0][0] === segmentClass.name);
        return matchingStrings.map(segmentString => {
            const segment = new segmentClass(segmentString);
            if (segment.type !== segmentClass.name) {
                throw new Error(`Consistency check failed. Deserializing ${segmentClass.name} returned ${segment.type}.`);
            }
            return segment;
        });
    }
    /**
     * Find the first segment with the specified segment class.
     *
     * @param segmentClass A segment's class. The response should be searched for a segments with a matching type.
     *
     * @return The deserialized matching segment. Can be `undefined` if no segement matched the specified type.
     */
    findSegment(segmentClass) {
        const segments = this.findSegments(segmentClass);
        return segments[0];
    }
    /**
     * Will be true if the request this response references was a success and no errors were found.
     * Responses containing warnings will always be treated as being successfully.
     */
    get success() {
        return !Array.from(this.returnValues().values()).some(value => value.error);
    }
    /**
     * An array with all error messages received from the server.
     */
    get errors() {
        return Array.from(this.returnValues().values())
            .filter(value => value.error)
            .map(value => `${value.code} ${value.message}`);
    }
    /**
     * Shorthand for extracting the dialog's id from the HNHBK segment.
     * If no HNHBK segment was found, an error will be thrown.
     */
    get dialogId() {
        const segment = this.findSegment(segments_1.HNHBK);
        if (!segment) {
            throw new Error("Invalid response. Missing \"HNHBK\" segment.");
        }
        return segment.dialogId;
    }
    /**
     * Shorthand for retrieving the bank's name from the HIBPA segment.
     * Will return `undefined` if no HIBPA segment was found.
     */
    get bankName() {
        const segment = this.findSegment(segments_1.HIBPA);
        if (segment) {
            return segment.bankName;
        }
    }
    /**
     * Shorthand for extracting the system's id from the HISYN segment.
     * If no HISYN segment was found, an error will be thrown.
     */
    get systemId() {
        const segment = this.findSegment(segments_1.HISYN);
        if (!segment) {
            throw new Error("Invalid response. Could not find system id.");
        }
        return segment.systemId;
    }
    /**
     * Will return a set of return values from either only HIRMG or HIRMS segments or both.
     * A return value is a set of a return code identifying it as well as a human readable message.
     *
     * @param segmentClasses Either HIRMG, HIRMS or both. Denotes which segment's return values should be processed.
     *
     * @return A map of (code -> return value).
     */
    returnValues(...segmentClasses) {
        const classes = segmentClasses.length === 0 ? [segments_1.HIRMG, segments_1.HIRMS] : segmentClasses;
        return classes.reduce((result, currentClass) => {
            const segment = this.findSegment(currentClass);
            if (!segment) {
                return result;
            }
            segment.returnValues.forEach((value, key) => result.set(key, value));
            return result;
        }, new Map());
    }
    /**
     * Will assemble a list of all supported TAN methods.
     */
    get supportedTanMethods() {
        const hirms = this.findSegments(segments_1.HIRMS).find(segment => segment.returnValues.has("3920"));
        const securityFunctions = hirms.returnValues.get("3920").parameters;
        const tanSegments = this.findSegments(segments_1.HITANS);
        return tanSegments.reduce((result, segment) => {
            segment.tanMethods.forEach(tanMethod => {
                if (securityFunctions.includes(tanMethod.securityFunction)) {
                    result.push(tanMethod);
                }
            });
            return result;
        }, []);
    }
    /**
     * Will assemble a list of all supported SEPA pain-message formats.
     */
    get painFormats() {
        return this.findSegment(segments_1.HISPAS).painFormats;
    }
    /**
     * Segments can reference each other.
     * Will find the segment of the specified class referencing the specified segment.
     *
     * @param segmentClass Ignore all sections except for segments of this type.
     * @param segment Find the segment in the current message that references the segment specified in this parameter.
     *
     * @return All segments of the specified type that reference the provided segment. Might be an empty array.
     */
    findSegmentForReference(segmentClass, segment) {
        return this.findSegments(segmentClass).find(current => current.reference === segment.segNo);
    }
    /**
     * Returns touchdowns contained in this message. Touchdowns are used for listing statements if the statement list
     * needed to be split into multiple requests.
     * The touchdowns are used for identifying from what request the list of statement was continued in this response.
     *
     * @param request The request for which the touchdown should be found.
     *
     * @return A map of (segment type -> touchdown identifier).
     */
    getTouchdowns(request) {
        return request.segments.reduce((result, requestSegment) => {
            const segment = this.findSegmentForReference(segments_1.HIRMS, requestSegment);
            if (segment) {
                const returnValue = segment.returnValues.get("3040");
                if (returnValue) {
                    result.set(requestSegment.type, returnValue.parameters[0]);
                }
            }
            return result;
        }, new Map());
    }
    /**
     * Will return the maximum version for the specified segment type in this message.
     *
     * @param segment The class of segments for which the maximum version should be found.
     *
     * @return The maximum version of the specified segment class version, or `0` if no segment was found.
     */
    segmentMaxVersion(segment) {
        return this.findSegments(segment).reduce((max, current) => current.version > max ? current.version : max, 0);
    }
    /**
     * Generate a textual representation for debug purposes.
     */
    get debugString() {
        return this.segmentStrings.map(segmentString => {
            const split = segmentString;
            return `Type: ${split[0][0]}\n` +
                `Version: ${split[0][2]}\n` +
                `Segment Number: ${split[0][1]}\n` +
                `Referencing: ${split[0].length <= 3 ? "None" : split[0][3]}\n` +
                `----\n` +
                split.slice(1).reduce((result, group, index) => {
                    return result + `DG ${index}: ${Array.isArray(group) ? group.join(", ") : group}\n`;
                }, "");
        }).join("\n");
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map