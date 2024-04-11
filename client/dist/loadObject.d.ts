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
export declare const enum LoadObjectOperation {
    None = 0,
    Creating = 1,
    Loading = 2,
    Updating = 3,
    Deleting = 4
}
export default class LoadObject<Value> {
    private readonly _operation;
    private readonly _hasValue;
    private readonly _value?;
    private readonly _error?;
    private constructor();
    get operation(): LoadObjectOperation;
    get value(): Value;
    get error(): Error;
    get hasOperation(): boolean;
    get hasValue(): boolean;
    get hasError(): boolean;
    get isEmpty(): boolean;
    withOperation(operation: LoadObjectOperation): LoadObject<Value>;
    withValue(value: Value): LoadObject<Value>;
    withError(error: Error): LoadObject<Value>;
    removeOperation(): LoadObject<Value>;
    removeValue(): LoadObject<Value>;
    removeError(): LoadObject<Value>;
    map(fn: (value: Value) => Value): LoadObject<Value>;
    get isCreating(): boolean;
    get isLoading(): boolean;
    get isUpdating(): boolean;
    get isDeleting(): boolean;
    done(): LoadObject<Value>;
    creating(): LoadObject<Value>;
    loading(): LoadObject<Value>;
    updating(): LoadObject<Value>;
    deleting(): LoadObject<Value>;
    static empty<Value>(): LoadObject<Value>;
    static creating<Value>(): LoadObject<Value>;
    static loading<Value>(): LoadObject<Value>;
    static updating<Value>(): LoadObject<Value>;
    static deleting<Value>(): LoadObject<Value>;
    static fromValue<Value>(value: Value): LoadObject<Value>;
    static fromError<Value>(error: Error): LoadObject<Value>;
    private static createFromOperation;
}
