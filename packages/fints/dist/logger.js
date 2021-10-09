"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.logger = winston_1.createLogger();
exports.logger.silent = true;
exports.verbose = (...args) => exports.logger.verbose(...args);
exports.warn = (...args) => exports.logger.warn(...args);
exports.error = (...args) => exports.logger.error(...args);
//# sourceMappingURL=logger.js.map