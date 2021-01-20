import { RegionActionTypes, RegionState, SET_REGION } from "./types";

const initialState = "";

export const regionReducer = (
    state = initialState,
    action: RegionActionTypes
): RegionState => {
    switch (action.type) {
        case SET_REGION:
            return action.payload;
        default:
            return state;
    }
};
