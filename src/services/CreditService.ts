import $api from "../http";
import { AxiosResponse } from "axios";
import { ICredit } from "../models/ICredit";

export default class CreditService {
  static createCredit(
    amount: number,
    percent: number,
    period: number,
    description: string
  ): Promise<AxiosResponse<ICredit>> {
    return $api.post<ICredit>("/create-credit", {
      amount,
      percent,
      period,
      description,
    });
  }
  static fetchAllCredits(): Promise<AxiosResponse<ICredit[]>> {
    return $api.post<ICredit[]>(`/creditlist`);
  }
  static async deleteCredit(
    credit_id: string | number
  ): Promise<AxiosResponse<ICredit>> {
    return $api.post<ICredit>(`/delete-credit`, {
      credit_id,
    });
  }
  static async getUsersCredits(
    user_id: string | number
  ): Promise<AxiosResponse<ICredit[]>> {
    return $api.post<ICredit[]>(`/get-userCredits/${user_id}`);
  }
}
