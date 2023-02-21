import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesConfig } from "../routes/routesConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Box, Button } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
