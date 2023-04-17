import { combineReducers } from "redux";
import authReducer from "./authReducer";
import creditsReducer from "./creditsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  credits: creditsReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
