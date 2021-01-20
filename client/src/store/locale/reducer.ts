import { LocaleActionTypes, LocaleState, SET_LOCALE } from "./types";

const initialState: LocaleState =
    (localStorage.getItem("locale") as LocaleState) || "";

export const localeReducer = (
    state: LocaleState = initialState,
    action: LocaleActionTypes
): LocaleState => {
    switch (action.type) {
        case SET_LOCALE:
            return action.payload;
        default:
            return state;
    }
};
