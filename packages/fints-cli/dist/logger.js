"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fints_1 = require("fints");
const Winston = __importStar(require("winston"));
const transport = new Winston.transports.Console({
    level: "verbose",
    format: Winston.format.combine(Winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss" }), Winston.format.colorize(), Winston.format.printf(param => `${param.timestamp} - ${param.level}: ${param.message}`)),
});
fints_1.logger.silent = false;
fints_1.logger.add(transport);
function setLevel(isVerbose) {
    const level = isVerbose ? "verbose" : "info";
    transport.level = level;
}
exports.setLevel = setLevel;
exports.logger = Winston.createLogger({ transports: [transport] });
exports.verbose = exports.logger.verbose;
exports.info = exports.logger.info;
exports.warn = exports.logger.warn;
exports.error = exports.logger.error;
//# sourceMappingURL=logger.js.map