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
Object.defineProperty(exports, "__esModule", { value: true });
class LoadObject {
    _operation;
    _hasValue;
    _value;
    _error;
    constructor(operation, hasValue, value, error) {
        this._operation = operation;
        this._hasValue = hasValue;
        this._value = value;
        this._error = error;
    }
    get operation() {
        return this._operation;
    }
    get value() {
        if (!this.hasValue) {
            throw new Error('Expected load object to have a value set');
        }
        return this._value; // Inferred as defined from "hasValue"
    }
    get error() {
        if (!this.hasError) {
            throw new Error('Expected load object to have an error set');
        }
        return this._error; // Inferred as defined from "hasError"
    }
    get hasOperation() {
        return (this._operation != 0 /* LoadObjectOperation.None */);
    }
    get hasValue() {
        return this._hasValue;
    }
    get hasError() {
        return !!this._error;
    }
    get isEmpty() {
        return !this.hasValue && !this.hasOperation && !this.hasError;
    }
    withOperation(operation) {
        return new LoadObject(operation, this.hasValue, this._value, this._error);
    }
    withValue(value) {
        return new LoadObject(this.operation, true, value, this._error);
    }
    withError(error) {
        return new LoadObject(this.operation, this.hasValue, this._value, error);
    }
    removeOperation() {
        if (this.operation == 0 /* LoadObjectOperation.None */) {
            return this;
        }
        return new LoadObject(0 /* LoadObjectOperation.None */, this.hasValue, this._value, this._error);
    }
    removeValue() {
        if (!this._value || !this.hasValue) {
            return this;
        }
        return new LoadObject(this.operation, false, undefined, this._error);
    }
    removeError() {
        if (!this.hasError) {
            return this;
        }
        return new LoadObject(this.operation, this.hasValue, this._value, undefined);
    }
    map(fn) {
        if (!this.hasValue) {
            return this;
        }
        return this.withValue(fn(this.value));
    }
    get isCreating() {
        return (this.operation == 1 /* LoadObjectOperation.Creating */);
    }
    get isLoading() {
        return (this.operation == 2 /* LoadObjectOperation.Loading */);
    }
    get isUpdating() {
        return (this.operation == 3 /* LoadObjectOperation.Updating */);
    }
    get isDeleting() {
        return (this.operation == 4 /* LoadObjectOperation.Deleting */);
    }
    done() {
        return this.withOperation(0 /* LoadObjectOperation.None */);
    }
    creating() {
        return this.withOperation(1 /* LoadObjectOperation.Creating */);
    }
    loading() {
        return this.withOperation(2 /* LoadObjectOperation.Loading */);
    }
    updating() {
        return this.withOperation(3 /* LoadObjectOperation.Updating */);
    }
    deleting() {
        return this.withOperation(4 /* LoadObjectOperation.Deleting */);
    }
    static empty() {
        return this.createFromOperation(0 /* LoadObjectOperation.None */);
    }
    static creating() {
        return this.createFromOperation(1 /* LoadObjectOperation.Creating */);
    }
    static loading() {
        return this.createFromOperation(2 /* LoadObjectOperation.Loading */);
    }
    static updating() {
        return this.createFromOperation(3 /* LoadObjectOperation.Updating */);
    }
    static deleting() {
        return this.createFromOperation(4 /* LoadObjectOperation.Deleting */);
    }
    static fromValue(value) {
        return new LoadObject(0 /* LoadObjectOperation.None */, true, value, undefined);
    }
    static fromError(error) {
        return new LoadObject(0 /* LoadObjectOperation.None */, false, undefined, error);
    }
    static createFromOperation(operation) {
        return new LoadObject(operation, false, undefined, undefined);
    }
}
exports.default = LoadObject;
//# sourceMappingURL=loadObject.js.map