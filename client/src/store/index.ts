import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { localeReducer } from "./locale/reducer";
import { regionReducer } from "./region/reducer";

const rootReducer = combineReducers({
    region: regionReducer,
    locale: localeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const initializeStore = (parameters?: RootState) => {
    return createStore(rootReducer, parameters, composeWithDevTools());
};
