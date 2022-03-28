import { combineReducers, createStore} from "redux";
import {mainReducer} from "./mainReducer";
const reducer=combineReducers({mainReducer});

export type globalStateType=ReturnType<typeof reducer>
export const store=createStore(reducer)
