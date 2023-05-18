import { IUser } from "../models/IUser";
import { ICredit } from "../models/ICredit";
import { IBorrow } from "../models/IBorrow";

// AUTH константы
export const SET_AUTH = "SET_AUTH";
export const SET_USER = "SET_USER";
export const SET_LOADING_AUTH = "SET_LOADING_AUTH";
export const SET_ERROR_AUTH = "SET_ERROR_AUTH";
export const CLEAR_ERROR = "CLEAR_ERROR";

// CREDITS константы
export const SET_CREDITS = "SET_CREDITS";
export const SET_LOADING_CREDITS = "SET_LOADING_AUTH";
export const SET_ERROR_CREDITS = "SET_ERROR_AUTH";
export const SET_ERROR_BORROWS = "SET_ERROR_BORROWS";

export interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error?: any;
}
export interface CreditsState {
  credits: ICredit[];
  isLoading: boolean;
  error?: any;
}
export interface BorrowsState {
  borrows: IBorrow[];
  isLoading: boolean;
  error?: any;
}

export interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: boolean;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: IUser;
}
export interface SetCreditsAction {
  type: typeof SET_CREDITS;
  payload: ICredit[];
}

export interface SetLoadingAuthAction {
  type: typeof SET_LOADING_AUTH;
  payload: boolean;
}
export interface SetLoadingCreditsAction {
  type: typeof SET_LOADING_CREDITS;
  payload: boolean;
}

export interface SetErrorCreditsAction {
  type: typeof SET_ERROR_CREDITS;
  payload: any;
}

export interface SetErrorBorrowsAction {
  type: typeof SET_ERROR_BORROWS;
  payload: any;
}

export interface SetErrorAuthAction {
  type: typeof SET_ERROR_AUTH;
  payload: any;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type CreditsActionTypes =
  | SetCreditsAction
  | SetLoadingCreditsAction
  | SetErrorCreditsAction
  | ClearErrorAction;

export type AuthActionTypes =
  | SetAuthAction
  | SetUserAction
  | SetLoadingAuthAction
  | SetErrorAuthAction
  | ClearErrorAction;

export type BorrowActionTypes = SetErrorBorrowsAction | ClearErrorAction;
