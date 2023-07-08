import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastOptions } from "react-toastify";
import {
  clearError,
  createBorrowRequest,
  createCredit,
  editProfile,
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
import BorrowService from "../services/BorrowService";
import { Toaster } from "@moneylend-ui";
import TransactionsService from "../services/TransactionsService";

type ToastFn = (text: string, extraOptions?: ToastOptions) => void;

const showToast =
  (type: "success" | "error" | "info") =>
  (message: string, options?: ToastOptions) =>
    toast(<Toaster variant={type} caption={message} />, {
      type: type,
      icon: false,
      ...options,
    } as ToastOptions);

export function useToast(): {
  success: ToastFn;
  info: ToastFn;
  error: ToastFn;
} {
  return {
    success: showToast("success"),
    error: showToast("error"),
    info: showToast("info"),
  };
}

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
  user_id: string | number | undefined
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

export const useDeleteCredit = (): [
  { loading: boolean },
  (payload: { creditId: number }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  return [
    { loading },
    async (payload: { creditId: number }) => {
      setLoading(true);

      try {
        await CreditService.deleteCredit(payload.creditId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};

export const useGetBorrowRequestsCredit = (
  creditId: number
): { isLoading: boolean; borrows: IBorrow[] } => {
  const isLoadingRef = useRef(false);
  const borrowsRef = useRef<IBorrow[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchBorrows = async () => {
      if (creditId) {
        isLoadingRef.current = true;
        const response = await BorrowService.fetchBorrowsForCredit(creditId);

        if (isMounted) {
          isLoadingRef.current = false;
          borrowsRef.current = response.data;
        }
      }
    };

    fetchBorrows();

    return () => {
      isMounted = false;
    };
  }, [creditId]);

  return { borrows: borrowsRef.current, isLoading: isLoadingRef.current };
};

export const useGetUserBorrows = (): {
  isLoading: boolean;
  borrows: IBorrow[];
} => {
  const [loading, setLoading] = useState(false);
  const [borrows, setBorrows] = useState<IBorrow[]>([]);
  const userId = useCurrentUser()?.id;

  useEffect(() => {
    const fetchCredits = async () => {
      if (userId) {
        setLoading(true);
        const response = await BorrowService.fetchUserBorrows(userId);
        setBorrows(response.data);
        setLoading(false);
      }
    };
    fetchCredits();
  }, []);
  return { borrows, isLoading: loading };
};

export const useExportCreditsToCsv = (): [
  { loading: boolean },
  () => Promise<void>
] => {
  const [loading, setLoading] = useState(false);

  return [
    { loading },
    async () => {
      setLoading(true);

      try {
        const response = await CreditService.exportToCsv();
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "credits.csv";
        a.click();
        URL.revokeObjectURL(url);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};

export const useDepositAmount = (): [
  { loading: boolean },
  (payload: { amount: number; userId: string | number }) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);

  return [
    { loading },
    async (payload: { amount: number; userId: string | number }) => {
      setLoading(true);

      try {
        await TransactionsService.depositUser(payload.amount, payload.userId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};
