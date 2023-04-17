import {
  SET_CREDITS,
  SET_LOADING_CREDITS,
  SET_ERROR_CREDITS,
  CLEAR_ERROR,
  CreditsActionTypes,
  CreditsState,
} from "../types";
import { ICredit } from "../../models/ICredit";

const initialAuthState: CreditsState = {
  credits: [{} as ICredit],
  isLoading: false,
  error: null,
};

const authReducer = (
  state = initialAuthState,
  action: CreditsActionTypes
): CreditsState => {
  switch (action.type) {
    case SET_CREDITS:
      return { ...state, credits: action.payload };
    case SET_LOADING_CREDITS:
      return { ...state, isLoading: action.payload };
    case SET_ERROR_CREDITS:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
