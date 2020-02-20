import { combineReducers } from "redux";
import matriz from "./matriz";
import solve from "./solve";

const rootReducer = combineReducers({ matriz, solve });

export default rootReducer;
