import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesConfig } from "../routes/routesConfig";
import { Box } from "@mui/material";
import { Header } from "../components/navigation";
import { Context } from "../index";
import { getLocalStorage } from "../utils/localStorage";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";
import { MLButton } from "@moneylend-ui";

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { store } = useContext(Context);
  useEffect(() => {
    if (getLocalStorage("token")) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box height={"100vh"}>
      <Box
        height={"100vh"}
        width={"100vw"}
        position={"fixed"}
        top={0}
        left={0}
        sx={{
          backgroundImage: `url(../../images/background.png)`,
          backgroundSize: "100%",
        }}
        zIndex={"-1"}
      />
      <Header />
      <h1 style={{ color: "white", fontSize: "50px" }}>
        {store.isLoading
          ? "Загрузка...."
          : store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "Пользователя нет"}
      </h1>
      <MLButton onClick={getUsers}>getUsers</MLButton>
      {users?.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
      <BrowserRouter>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Box
                  display={"flex"}
                  height={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  paddingTop={"75px"}
                >
                  {route.element}
                </Box>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default observer(App);
