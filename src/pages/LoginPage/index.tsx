import React from "react";
import { Block } from "./styles";
import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITransferField } from "./types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm<ITransferField>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });
  const handleTransfer: SubmitHandler<ITransferField> = async ({
    email,
    password,
  }) => {
    console.log(email, password);
    await axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      })
      .then(function (res) {
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Block>
      <Box
        component="form"
        onSubmit={handleSubmit(handleTransfer)}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            type="text"
            label={"E-mail"}
            variant={"outlined"}
            {...register("email")}
          />
        </div>
        <div>
          <TextField
            type="text"
            label={"Password"}
            variant={"outlined"}
            {...register("password")}
          />
        </div>
        <div>
          <Button variant={"outlined"} type={"submit"}>
            Login
          </Button>
        </div>
        <div>
          <Button
            variant={"text"}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Go to signup
          </Button>
        </div>
      </Box>
    </Block>
  );
};

export default LoginPage;
