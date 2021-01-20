import { Action } from "redux";
import { getLocaleFromRegion } from "../../utils/getLocaleFromRegion";

export const SET_LOCALE = "SET_LOCALE";

type SetLocaleAction = Action<typeof SET_LOCALE> & {
    payload: LocaleState;
};

export type LocaleState = ReturnType<typeof getLocaleFromRegion> | "";

export type LocaleActionTypes = SetLocaleAction;
