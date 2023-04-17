import {
  AuthActionTypes,
  AuthState,
  CLEAR_ERROR,
  SET_AUTH,
  SET_ERROR_AUTH,
  SET_LOADING_AUTH,
  SET_USER,
} from "../types";
import { IUser } from "../../models/IUser";

const initialAuthState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  error: null,
};

const authReducer = (
  state = initialAuthState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING_AUTH:
      return { ...state, isLoading: action.payload };
    case SET_ERROR_AUTH:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
