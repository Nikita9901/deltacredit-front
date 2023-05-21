import $api from "../http";
import { AxiosResponse } from "axios";
import { IBorrow } from "../models/IBorrow";

export default class BorrowService {
  static createBorrowRequest(
    userId: string | number,
    creditId: number | string,
    amount: number,
    percent: number
  ): Promise<AxiosResponse<IBorrow>> {
    return $api.post<IBorrow>("/create-borrow", {
      userId,
      creditId,
      amount,
      percent,
    });
  }
  static fetchBorrowsForCredit(
    creditId: number | string
  ): Promise<AxiosResponse<IBorrow[]>> {
    return $api.post<IBorrow[]>(`/get-borrows/${creditId}`);
  }
  static fetchUserBorrows(
    userId: number | string
  ): Promise<AxiosResponse<IBorrow[]>> {
    return $api.post<IBorrow[]>(`/get-userBorrows/${userId}`);
  }
}
