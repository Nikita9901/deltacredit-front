import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.post<IUser[]>("/users");
  }
  static fetchUserId(id: string | undefined): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(`/user/${id}`);
  }
  static async editProfile(
    id: string | number,
    name: string,
    surname: string,
    phone_number: string,
    username: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(`/user/edit/${id}`, {
      name,
      surname,
      phone_number,
      username,
    });
  }
}
