import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createBorrowRequest,
  createCredit,
  editProfile,
  getBorrowRequestsCredit,
  login,
  logout,
  signup,
} from "../store/actions";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";
import { ICredit } from "../models/ICredit";
import CreditService from "../services/CreditService";
import { IBorrow } from "../models/IBorrow";

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
export const useRegistration = (): [
  { loading: boolean },
  (payload: { email: string; password: string }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return [
    { loading },
    async (payload: { email: string; password: string }) => {
      setLoading(true);

      try {
        await dispatch(signup(payload.email, payload.password));
        setLoading(false);
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

export const useIsLoading = () => {
  return (
    useSelector((state: RootState) => state.auth)?.isLoading ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSelector((state: RootState) => state.credits)?.isLoading
  );
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

export const useGetUserCredits = (
  user_id: string | undefined
): { isLoading: boolean; userCredits: ICredit[] } => {
  const [userCredits, setUserCredits] = useState([] as ICredit[]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCredits = async () => {
      if (user_id) {
        setLoading(true);
        const response = await CreditService.getUsersCredits(user_id);
        setLoading(false);
        setUserCredits(response.data);
      }
    };
    fetchCredits();
  }, [user_id]);
  return { userCredits, isLoading: loading };
};
export const useCreateCredit = (): [
  { loading: boolean },
  (payload: {
    amount: number;
    percent: number;
    period: number;
    description: string;
  }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return [
    { loading },
    async (payload: {
      amount: number;
      percent: number;
      period: number;
      description: string;
    }) => {
      setLoading(true);

      try {
        await dispatch(
          createCredit(
            payload.amount,
            payload.percent,
            payload.period,
            payload.description
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

export const useGetCreditsList = (): [ICredit[], boolean] => {
  const credits = useSelector((state: RootState) => state.credits);
  const creditList = credits.credits || ([] as ICredit[]);
  const isLoading = credits.isLoading || false;
  return [creditList, isLoading];
};

export const useCreateBorrowRequest = (): [
  { loading: boolean },
  (payload: {
    creditId: number;
    amount: number;
    percent: number;
  }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userId = useCurrentUser()?.id;

  return [
    { loading },
    async (payload: { creditId: number; amount: number; percent: number }) => {
      setLoading(true);

      try {
        await dispatch(
          createBorrowRequest(
            userId,
            payload.creditId,
            payload.amount,
            payload.percent
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

export const useGetBorrowRequestsCredit = (): [
  { loading: boolean },
  (payload: { creditId: number | string }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userId = useCurrentUser()?.id;

  return [
    { loading },
    async (payload: { creditId: number | string }) => {
      setLoading(true);

      try {
        const borrowRequests = await dispatch(
          getBorrowRequestsCredit(payload.creditId)
        );
        setLoading(false);
        return borrowRequests;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};
// export function useCurrentUser(): UserData | Partial<UserData> {
//   return (
//       useSelector((state: RootState) => state.user)?.user || ({} as UserData)
//   );
// }
