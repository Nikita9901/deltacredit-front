import { HomePage, SignupPage, LoginPage } from "../pages";
import { ReactNode } from "react";

interface route {
  path: string;
  exact: boolean;
  element: ReactNode;
}
export const routesConfig: route[] = [
  {
    path: "/",
    exact: true,
    element: <HomePage />,
  },
  {
    path: "/login",
    exact: true,
    element: <LoginPage />,
  },
  {
    path: "/signup",
    exact: true,
    element: <SignupPage />,
  },
];
