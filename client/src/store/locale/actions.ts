import { LocaleActionTypes, LocaleState, SET_LOCALE } from "./types";

export const setLocale = (payload: LocaleState): LocaleActionTypes => ({
    type: SET_LOCALE,
    payload,
});
