import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Block } from "./styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITransferField } from "./types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
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
    username,
  }) => {
    console.log(email, password);
    await axios
      .post("http://127.0.0.1:8000/api/signup", {
        email,
        password,
        username,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/");
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
            label={"Username"}
            variant={"outlined"}
            {...register("username")}
          />
        </div>
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
            Sign up
          </Button>
        </div>
        <div>
          <Button
            variant={"text"}
            onClick={() => {
              navigate("/login");
            }}
          >
            Go to login
          </Button>
        </div>
      </Box>
    </Block>
  );
};

export default SignupPage;
