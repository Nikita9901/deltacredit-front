import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesConfig } from "../routes/routesConfig";
import { Box } from "@mui/material";
import { Header } from "../components/navigation";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { checkAuth, getCreditsList } from "../store/actions";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getCreditsList());
  }, []);

  return (
    <Box paddingTop={"50px"}>
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

      <BrowserRouter>
        <Header />
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

export default App;
