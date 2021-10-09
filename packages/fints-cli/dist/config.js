"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const clime_1 = require("clime");
const fints_1 = require("fints");
const YAML = __importStar(require("yamljs"));
class BaseConfig extends clime_1.Options {
    get serializer() {
        return this.json ? JSON.stringify : (obj) => YAML.stringify(obj, 4);
    }
}
__decorate([
    clime_1.option({
        required: false,
        flag: "i",
        description: "Product ID from fints.(opt)",
        default: fints_1.PRODUCT_NAME,
    }),
    __metadata("design:type", String)
], BaseConfig.prototype, "productId", void 0);
__decorate([
    clime_1.option({ required: true, flag: "u", description: "Endpoint URL." }),
    __metadata("design:type", String)
], BaseConfig.prototype, "url", void 0);
__decorate([
    clime_1.option({ required: true, flag: "n", description: "Username used for connecting." }),
    __metadata("design:type", String)
], BaseConfig.prototype, "name", void 0);
__decorate([
    clime_1.option({ required: true, flag: "p", description: "Pin used for connecting." }),
    __metadata("design:type", String)
], BaseConfig.prototype, "pin", void 0);
__decorate([
    clime_1.option({ required: true, flag: "b", description: "BLZ of the bank to connect to." }),
    __metadata("design:type", String)
], BaseConfig.prototype, "blz", void 0);
__decorate([
    clime_1.option({ toggle: true, flag: "d" }),
    __metadata("design:type", Boolean)
], BaseConfig.prototype, "debug", void 0);
__decorate([
    clime_1.option({ toggle: true, flag: "v" }),
    __metadata("design:type", Boolean)
], BaseConfig.prototype, "verbose", void 0);
__decorate([
    clime_1.option({ toggle: true, flag: "j" }),
    __metadata("design:type", Boolean)
], BaseConfig.prototype, "json", void 0);
exports.BaseConfig = BaseConfig;
//# sourceMappingURL=config.js.map