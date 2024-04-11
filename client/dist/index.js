"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GraphQLClient = void 0;
var requests_1 = require("./requests");
var GraphQLClient = /** @class */ (function () {
    function GraphQLClient(graphUrl) {
        this.graphUrl = graphUrl;
    }
    GraphQLClient.prototype.findContacts = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            query: "\n\t\t\tquery($filter: contacts_find_filter) {\n\t\t\t\tcontacts {\n\t\t\t\t\tcontacts_find(filter: $filter) {\n\t\t\t\t\t\tsuccess,\n\t\t\t\t\t\tmessage,\n\t\t\t\t\t\tdocs {\n\t\t\t\t\t\t\ttitle,\n\t\t\t\t\t\t\tforename,\n\t\t\t\t\t\t\tsurname\n\t\t\t\t\t\t},\n\t\t\t\t\t\ttotal_results_count,\n\t\t\t\t\t\tresults_per_page\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}",
                            variables: {
                                filter: filter
                            }
                        };
                        return [4 /*yield*/, (0, requests_1.postRequest)(this.graphUrl, payload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GraphQLClient.prototype.insertContact = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            query: "\n\t\t\tmutation($input: contact_insert_input) {\n\t\t\t\tcontacts {\n\t\t\t\t\tcontact_insert(input: $input) {\n\t\t\t\t\t\tsuccess,\n\t\t\t\t\t\tmessage\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}",
                            variables: {
                                input: input
                            }
                        };
                        return [4 /*yield*/, (0, requests_1.postRequest)(this.graphUrl, payload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GraphQLClient;
}());
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=index.js.map