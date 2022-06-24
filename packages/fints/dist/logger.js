"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.verbose = exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)();
exports.logger.silent = true;
const verbose = (...args) => exports.logger.verbose(...args);
exports.verbose = verbose;
const warn = (...args) => exports.logger.warn(...args);
exports.warn = warn;
const error = (...args) => exports.logger.error(...args);
exports.error = error;
//# sourceMappingURL=logger.js.map