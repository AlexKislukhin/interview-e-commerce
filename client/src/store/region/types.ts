import { Action } from "redux";

export const SET_REGION = "SET_REGION";

type SetRegionAction = Action<typeof SET_REGION> & {
    payload: string;
};

export type RegionState = string;

export type RegionActionTypes = SetRegionAction;
