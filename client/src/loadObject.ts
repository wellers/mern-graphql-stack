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

// Burg'd from: https://github.com/facebook/flux/blob/master/examples/flux-async/src/load_object/LoadObject.js

export const enum LoadObjectOperation {
	None,
	Creating,
	Loading,
	Updating,
	Deleting,
}

export default class LoadObject<Value> {
	private readonly _operation: LoadObjectOperation;
	private readonly _hasValue: boolean;
	private readonly _value?: Value;
	private readonly _error?: Error;

	private constructor(
		operation: LoadObjectOperation,
		hasValue: boolean,
		value?: Value,
		error?: Error
	) {
		this._operation = operation;
		this._hasValue = hasValue;
		this._value = value;
		this._error = error;
	}

	get operation() {
		return this._operation;
	}

	get value(): Value {
		if (!this.hasValue) {
			throw new Error('Expected load object to have a value set');
		}
		return this._value!; // Inferred as defined from "hasValue"
	}

	get error(): Error {
		if (!this.hasError) {
			throw new Error('Expected load object to have an error set');
		}
		return this._error!; // Inferred as defined from "hasError"
	}

	get hasOperation() {
		return (this._operation != LoadObjectOperation.None);
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

	withOperation(operation: LoadObjectOperation) {
		return new LoadObject(
			operation,
			this.hasValue,
			this._value,
			this._error
		);
	}

	withValue(value: Value) {
		return new LoadObject(
			this.operation,
			true,
			value,
			this._error
		);
	}

	withError(error: Error) {
		return new LoadObject(
			this.operation,
			this.hasValue,
			this._value,
			error
		);
	}

	removeOperation(): LoadObject<Value> {
		if (this.operation == LoadObjectOperation.None) {
			return this;
		}
		return new LoadObject<Value>(
			LoadObjectOperation.None,
			this.hasValue,
			this._value,
			this._error
		);
	}

	removeValue(): LoadObject<Value> {
		if (!this._value || !this.hasValue) {
			return this;
		}
		return new LoadObject<Value>(
			this.operation,
			false,
			undefined,
			this._error
		);
	}

	removeError(): LoadObject<Value> {
		if (!this.hasError) {
			return this;
		}
		return new LoadObject<Value>(
			this.operation,
			this.hasValue,
			this._value,
			undefined
		);
	}

	map(fn: (value: Value) => Value) {
		if (!this.hasValue) {
			return this;
		}
		return this.withValue(fn(this.value));
	}

	get isCreating() {
		return (this.operation == LoadObjectOperation.Creating);
	}

	get isLoading() {
		return (this.operation == LoadObjectOperation.Loading);
	}

	get isUpdating() {
		return (this.operation == LoadObjectOperation.Updating);
	}

	get isDeleting() {
		return (this.operation == LoadObjectOperation.Deleting);
	}

	done() {
		return this.withOperation(LoadObjectOperation.None);
	}

	creating() {
		return this.withOperation(LoadObjectOperation.Creating);
	}

	loading() {
		return this.withOperation(LoadObjectOperation.Loading);
	}

	updating() {
		return this.withOperation(LoadObjectOperation.Updating);
	}

	deleting() {
		return this.withOperation(LoadObjectOperation.Deleting);
	}

	public static empty<Value>() {
		return this.createFromOperation<Value>(LoadObjectOperation.None);
	}

	static creating<Value>() {
		return this.createFromOperation<Value>(LoadObjectOperation.Creating);
	}

	static loading<Value>() {
		return this.createFromOperation<Value>(LoadObjectOperation.Loading);
	}

	static updating<Value>() {
		return this.createFromOperation<Value>(LoadObjectOperation.Updating);
	}

	static deleting<Value>() {
		return this.createFromOperation<Value>(LoadObjectOperation.Deleting);
	}

	static fromValue<Value>(value: Value) {
		return new LoadObject<Value>(
			LoadObjectOperation.None,
			true,
			value,
			undefined
		);
	}

	static fromError<Value>(error: Error) {
		return new LoadObject<Value>(
			LoadObjectOperation.None,
			false,
			undefined,
			error
		);
	}

	private static createFromOperation<Value>(operation: LoadObjectOperation) {
		return new LoadObject<Value>(
			operation,
			false,
			undefined,
			undefined
		);
	}
}