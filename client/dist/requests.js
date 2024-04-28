"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = void 0;
const loadObject_1 = __importDefault(require("./loadObject"));
async function postRequest(endpoint, payload) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "pragma": "no-cache",
            "cache-control": "no-cache"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(endpoint, options);
        let error = '';
        if (!response.ok && response.status) {
            switch (response.status) {
                case 404:
                    error = 'Resource not found';
                    break;
                case 500:
                    error = 'An error has occurred';
                    break;
                default:
                    error = 'An unexpected error occurred';
            }
        }
        if (error.length > 0) {
            throw error;
        }
        const result = await response.json();
        return loadObject_1.default.fromValue(result.data);
    }
    catch (error) {
        return loadObject_1.default.fromError(new Error(JSON.stringify(error || '')));
    }
}
exports.postRequest = postRequest;
//# sourceMappingURL=requests.js.map