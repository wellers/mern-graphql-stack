// Add polyfills recommended by the ts-polyfill library (https://www.npmjs.com/package/ts-polyfill)
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2015-collection';
import 'ts-polyfill/lib/es2016-array-include';
import 'ts-polyfill/lib/es2017-string';
import 'ts-polyfill/lib/es2017-object';
import 'ts-polyfill/lib/es2018-promise';

import * as ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import "./index.less";
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./stores";

const loggerMiddleware = createLogger();

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware).concat(loggerMiddleware)
});

ReactDOM.render(
	<Provider store={store}>
		<AppRouter></AppRouter>
	</Provider>,
	document.getElementById("root")
);