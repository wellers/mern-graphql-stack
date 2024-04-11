"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
exports.__esModule = true;
var LoadObject = /** @class */ (function () {
    function LoadObject(operation, hasValue, value, error) {
        this._operation = operation;
        this._hasValue = hasValue;
        this._value = value;
        this._error = error;
    }
    Object.defineProperty(LoadObject.prototype, "operation", {
        get: function () {
            return this._operation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "value", {
        get: function () {
            if (!this.hasValue) {
                throw new Error('Expected load object to have a value set');
            }
            return this._value; // Inferred as defined from "hasValue"
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "error", {
        get: function () {
            if (!this.hasError) {
                throw new Error('Expected load object to have an error set');
            }
            return this._error; // Inferred as defined from "hasError"
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasOperation", {
        get: function () {
            return (this._operation != 0 /* None */);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasValue", {
        get: function () {
            return this._hasValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "hasError", {
        get: function () {
            return !!this._error;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isEmpty", {
        get: function () {
            return !this.hasValue && !this.hasOperation && !this.hasError;
        },
        enumerable: false,
        configurable: true
    });
    LoadObject.prototype.withOperation = function (operation) {
        return new LoadObject(operation, this.hasValue, this._value, this._error);
    };
    LoadObject.prototype.withValue = function (value) {
        return new LoadObject(this.operation, true, value, this._error);
    };
    LoadObject.prototype.withError = function (error) {
        return new LoadObject(this.operation, this.hasValue, this._value, error);
    };
    LoadObject.prototype.removeOperation = function () {
        if (this.operation == 0 /* None */) {
            return this;
        }
        return new LoadObject(0 /* None */, this.hasValue, this._value, this._error);
    };
    LoadObject.prototype.removeValue = function () {
        if (!this._value || !this.hasValue) {
            return this;
        }
        return new LoadObject(this.operation, false, undefined, this._error);
    };
    LoadObject.prototype.removeError = function () {
        if (!this.hasError) {
            return this;
        }
        return new LoadObject(this.operation, this.hasValue, this._value, undefined);
    };
    LoadObject.prototype.map = function (fn) {
        if (!this.hasValue) {
            return this;
        }
        return this.withValue(fn(this.value));
    };
    Object.defineProperty(LoadObject.prototype, "isCreating", {
        get: function () {
            return (this.operation == 1 /* Creating */);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isLoading", {
        get: function () {
            return (this.operation == 2 /* Loading */);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isUpdating", {
        get: function () {
            return (this.operation == 3 /* Updating */);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadObject.prototype, "isDeleting", {
        get: function () {
            return (this.operation == 4 /* Deleting */);
        },
        enumerable: false,
        configurable: true
    });
    LoadObject.prototype.done = function () {
        return this.withOperation(0 /* None */);
    };
    LoadObject.prototype.creating = function () {
        return this.withOperation(1 /* Creating */);
    };
    LoadObject.prototype.loading = function () {
        return this.withOperation(2 /* Loading */);
    };
    LoadObject.prototype.updating = function () {
        return this.withOperation(3 /* Updating */);
    };
    LoadObject.prototype.deleting = function () {
        return this.withOperation(4 /* Deleting */);
    };
    LoadObject.empty = function () {
        return this.createFromOperation(0 /* None */);
    };
    LoadObject.creating = function () {
        return this.createFromOperation(1 /* Creating */);
    };
    LoadObject.loading = function () {
        return this.createFromOperation(2 /* Loading */);
    };
    LoadObject.updating = function () {
        return this.createFromOperation(3 /* Updating */);
    };
    LoadObject.deleting = function () {
        return this.createFromOperation(4 /* Deleting */);
    };
    LoadObject.fromValue = function (value) {
        return new LoadObject(0 /* None */, true, value, undefined);
    };
    LoadObject.fromError = function (error) {
        return new LoadObject(0 /* None */, false, undefined, error);
    };
    LoadObject.createFromOperation = function (operation) {
        return new LoadObject(operation, false, undefined, undefined);
    };
    return LoadObject;
}());
exports["default"] = LoadObject;
//# sourceMappingURL=loadObject.js.map