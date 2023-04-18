import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../store";
import {
  AuthActionTypes,
  CLEAR_ERROR,
  CreditsActionTypes,
  SET_AUTH,
  SET_CREDITS,
  SET_ERROR_AUTH,
  SET_LOADING_AUTH,
  SET_LOADING_CREDITS,
  SET_ERROR_CREDITS,
  SET_USER,
} from "../types";
import AuthService from "../../services/AuthService";
import { removeLocalStorage, setLocalStorage } from "../../utils/localStorage";
import axios from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import UserService from "../../services/UserService";
import { ICredit } from "../../models/ICredit";
import CreditService from "../../services/CreditService";

export const setAuth = (bool: boolean): AuthActionTypes => ({
  type: SET_AUTH,
  payload: bool,
});

export const setUser = (user: any): AuthActionTypes => ({
  type: SET_USER,
  payload: user,
});
export const setCredits = (creditsList: ICredit[]): CreditsActionTypes => ({
  type: SET_CREDITS,
  payload: creditsList,
});

export const setLoadingAuth = (bool: boolean): AuthActionTypes => ({
  type: SET_LOADING_AUTH,
  payload: bool,
});
export const setLoadingCredits = (bool: boolean): AuthActionTypes => ({
  type: SET_LOADING_CREDITS,
  payload: bool,
});

export const setErrorAuth = (error: string): AuthActionTypes => ({
  type: SET_ERROR_AUTH,
  payload: error,
});
export const setErrorCredits = (error: string): AuthActionTypes => ({
  type: SET_ERROR_CREDITS,
  payload: error,
});

export const clearError = (): AuthActionTypes => ({
  type: CLEAR_ERROR,
});

export const login =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.login(email, password);
      setLocalStorage("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorAuth(e.response?.data?.message || "Error"));
    }
  };
export const editProfile =
  (
    id: string | number,
    name: string,
    surname: string,
    phone_number: string,
    username: string
  ): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.editProfile(
        id,
        name,
        surname,
        phone_number,
        username
      );
      dispatch(setUser(response.data));
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorAuth(e.response?.data?.message || "Error"));
    }
  };

export const signup =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.signup(email, password);
      setLocalStorage("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorAuth(e.response?.data?.message || "Error"));
    }
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      await AuthService.logout();
      removeLocalStorage("token");
      dispatch(setAuth(false));
      dispatch(setUser({}));
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorAuth(e.response?.data?.message || "Error"));
    }
  };

export const checkAuth =
  (): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingAuth(true));
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.REACT_APP_BASE_API}/refresh`,
        {},
        { withCredentials: true }
      );
      setLocalStorage("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (e) {
      // @ts-ignore
      dispatch(setError(e.response?.data?.message || "Error"));
    } finally {
      dispatch(setLoadingAuth(false));
    }
  };
export const getCreditsList =
  (): ThunkAction<void, RootState, unknown, CreditsActionTypes> =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingCredits(true));
    try {
      const response = await CreditService.fetchAllCredits();
      dispatch(setCredits(response.data));
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorCredits(e.response?.data?.message || "Error"));
    } finally {
      dispatch(setLoadingCredits(false));
    }
  };

export const getUserById =
  (id: string): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.fetchUserId(id);
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorAuth(e.response?.data?.message || "Error"));
    }
  };

export const createCredit =
  (
    amount: number,
    percent: number,
    period: number,
    description: string
  ): ThunkAction<void, RootState, unknown, CreditsActionTypes> =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await CreditService.createCredit(
        amount,
        percent,
        period,
        description
      );
    } catch (e) {
      // @ts-ignore
      dispatch(setErrorCredits(e.response?.data?.message || "Error"));
    }
  };
