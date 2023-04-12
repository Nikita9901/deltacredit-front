import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { removeLocalStorage, setLocalStorage } from "../utils/localStorage";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import * as process from "process";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      setLocalStorage("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async signup(email: string, password: string) {
    try {
      const response = await AuthService.signup(email, password);
      console.log(response);
      setLocalStorage("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      removeLocalStorage("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.REACT_APP_BASE_API}/refresh`,
        {},
        { withCredentials: true }
      );
      console.log(response);
      setLocalStorage("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
