import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesConfig } from "../routes/routesConfig";
import { Box } from "@mui/material";
import { Header } from "../components/navigation";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getCreditsList } from "../store/actions";
import { useIsLoading } from "../utils/hooks";
import Layout from "../components/Layout";
import ModalProvider from "mui-modal-provider";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth)?.isLoading;
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
          backgroundImage: "url(../../images/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
        zIndex={"-1"}
      />

      <BrowserRouter>
        <ModalProvider>
          {!loading && (
            <>
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
            </>
          )}
        </ModalProvider>
      </BrowserRouter>
    </Box>
  );
};

export default App;
