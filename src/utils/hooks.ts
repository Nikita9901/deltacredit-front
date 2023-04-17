import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, login, logout } from "../store/actions";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: { email: string; password: string }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return [
    { loading },
    async (payload: { email: string; password: string }) => {
      setLoading(true);

      try {
        await dispatch(login(payload.email, payload.password));
        setLoading(false);
        navigate("/");
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};
export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth)?.user;
};

export const useEditProfile = (): [
  { loading: boolean },
  (payload: {
    name: string;
    surname: string;
    phone_number: string;
    username: string;
  }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const id = useCurrentUser()?.id;

  return [
    { loading },
    async (payload: {
      name: string;
      surname: string;
      phone_number: string;
      username: string;
    }) => {
      setLoading(true);

      try {
        await dispatch(
          editProfile(
            id,
            payload.name,
            payload.surname,
            payload.phone_number,
            payload.username
          )
        );
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};

export const useIsAuthenticated = () => {
  return [
    useSelector((state: RootState) => state.auth)?.isAuth,
    useSelector((state: RootState) => state.auth)?.isLoading,
  ];
};
export function useAuthCheck() {
  const navigate = useNavigate();
  const [isAuthenticated, loading] = useIsAuthenticated();
  if (!isAuthenticated && !loading) {
    navigate("/login");
  }

  return isAuthenticated;
}

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  return () => {
    dispatch(logout());
    navigate("/login");
  };
};

export const useGetUserById = (
  id: string | undefined
): { isLoading: boolean; user: IUser } => {
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        const response = await UserService.fetchUserId(id);
        setLoading(false);
        setUser(response.data);
      }
    };
    fetchUser();
  }, [id]);
  return { user, isLoading: loading };
};

export const useGetCreditsList = () => {
  return [
    useSelector((state: RootState) => state.credits)?.credits,
    useSelector((state: RootState) => state.credits)?.isLoading,
  ];
};
// export function useCurrentUser(): UserData | Partial<UserData> {
//   return (
//       useSelector((state: RootState) => state.user)?.user || ({} as UserData)
//   );
// }
