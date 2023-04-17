import {
  HomePage,
  SignupPage,
  LoginPage,
  ProfilePage,
  EditProfilePage,
  CreditsListPage,
} from "../pages";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const outleted = (Component: JSX.Element) => (
  <>
    {Component}
    <Outlet />
  </>
);

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
  {
    path: `/profile/:profileId`,
    exact: false,
    element: outleted(<ProfilePage />),
  },
  {
    path: `/profile/:profileId/edit`,
    exact: true,
    element: outleted(<EditProfilePage />),
  },
  {
    path: `/credits`,
    exact: true,
    element: <CreditsListPage />,
  },
];
