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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fints_1 = require("fints");
const logger_1 = require("../logger");
const clime_1 = require("clime");
const config_1 = require("../config");
let default_1 = class default_1 extends clime_1.Command {
    execute(_a) {
        var { verbose, json, serializer } = _a, config = __rest(_a, ["verbose", "json", "serializer"]);
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.setLevel(verbose);
            const client = new fints_1.PinTanClient(config);
            const accounts = yield client.accounts();
            console.info(serializer(accounts));
        });
    }
};
__decorate([
    clime_1.metadata,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [config_1.BaseConfig]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "execute", null);
default_1 = __decorate([
    clime_1.command({ description: "List the accounts available for the specified user." })
], default_1);
exports.default = default_1;
//# sourceMappingURL=list-accounts.js.map