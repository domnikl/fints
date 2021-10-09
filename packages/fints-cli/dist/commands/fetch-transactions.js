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
const date_fns_1 = require("date-fns");
const fints_1 = require("fints");
const logger_1 = require("../logger");
const clime_1 = require("clime");
const config_1 = require("../config");
class FetchStatementOptions extends config_1.BaseConfig {
}
__decorate([
    clime_1.option({ required: true, flag: "i", description: "IBAN of the account to fetch." }),
    __metadata("design:type", String)
], FetchStatementOptions.prototype, "iban", void 0);
__decorate([
    clime_1.option({ flag: "s", description: "Date of earliest transaction to fetch." }),
    __metadata("design:type", String)
], FetchStatementOptions.prototype, "start", void 0);
__decorate([
    clime_1.option({ flag: "e", description: "Date of latest transaction to fetch." }),
    __metadata("design:type", String)
], FetchStatementOptions.prototype, "end", void 0);
exports.FetchStatementOptions = FetchStatementOptions;
let default_1 = class default_1 extends clime_1.Command {
    execute(_a) {
        var { verbose, json, serializer, iban, start, end } = _a, config = __rest(_a, ["verbose", "json", "serializer", "iban", "start", "end"]);
        return __awaiter(this, void 0, void 0, function* () {
            const endDate = end ? new Date(end) : new Date();
            if (isNaN(endDate.getTime())) {
                console.error("Invalid start date specified.");
                return;
            }
            const startDate = start ? new Date(start) : date_fns_1.subMonths(endDate, 1);
            if (isNaN(startDate.getTime())) {
                console.error("Invalid end date specified.");
                return;
            }
            if (endDate < startDate) {
                console.error("The end date must be after the start date.");
                return;
            }
            logger_1.setLevel(verbose);
            const client = new fints_1.PinTanClient(config);
            const accounts = yield client.accounts();
            const account = accounts.find(current => current.iban === iban);
            if (!account) {
                console.error("No account with specified iban found.");
                return;
            }
            const statements = yield client.statements(account, startDate, endDate);
            console.info(serializer(statements.reduce((result, statement) => {
                result.push(...statement.transactions);
                return result;
            }, [])));
        });
    }
};
__decorate([
    clime_1.metadata,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FetchStatementOptions]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "execute", null);
default_1 = __decorate([
    clime_1.command({ description: "Fetch the statements for a specified account." })
], default_1);
exports.default = default_1;
//# sourceMappingURL=fetch-transactions.js.map