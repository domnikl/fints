#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const clime_1 = require("clime");
const cli = new clime_1.CLI("fints", path.join(__dirname, "commands"));
const shim = new clime_1.Shim(cli);
shim.execute(process.argv);
//# sourceMappingURL=index.js.map