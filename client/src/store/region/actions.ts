import { RegionActionTypes, SET_REGION } from "./types";

export const setRegion = (payload: string): RegionActionTypes => ({
    type: SET_REGION,
    payload,
});
