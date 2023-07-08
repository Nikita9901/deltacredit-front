import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class TransactionsService {
  static depositUser(
    amount: number,
    userId: string | number
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/deposit", {
      userId,
      amount,
    });
  }
}
