import React from "react";
import { Block } from "./styles";
import { Box, Divider } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { useNavigate } from "react-router-dom";
import { MLButton, MLInput, MLTypography } from "@moneylend-ui";
import MLLogoImage from "../../moneylend-ui/components/MLLogoImage";
import { useAuthenticate, useToast } from "../../utils/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const errorsAuthed = useSelector((state: RootState) => state.auth)?.error;
  const toast = useToast();

  const [{ loading: loggingIn }, authenticate] = useAuthenticate();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ITransferField>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });
  const handleTransfer: SubmitHandler<ITransferField> = async ({
    email,
    password,
  }) => {
    try {
      await authenticate({ email, password });
      if (!errorsAuthed) navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Block>
      <Box
        component="form"
        onSubmit={handleSubmit(handleTransfer)}
        sx={{
          background: "rgba(4, 20, 31, 0.9)",
          border: "1px solid #002F42",
          borderRadius: "4px",
          width: "70%",
          minHeight: "500px",
          display: "flex",
        }}
        noValidate
        autoComplete="off"
      >
        <Box flex={1}>
          <MLLogoImage full />
        </Box>
        <Divider orientation={"vertical"} sx={{ backgroundColor: "#002F42" }} />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 0",
            gap: 2,
          }}
        >
          <MLTypography variant={"h3"}>Login</MLTypography>
          <Box display={"flex"} flexDirection={"column"} width={"65%"} gap={2}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput wide type="text" label={"E-mail Address"} {...field} />
              )}
              name={"email"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="password" wide label={"Password"} {...field} />
              )}
              name={"password"}
            />
          </Box>
          <MLButton
            loading={loggingIn}
            size={"large"}
            variant={"contained"}
            type={"submit"}
          >
            <MLTypography>Login</MLTypography>
          </MLButton>
          <MLButton
            variant={"text"}
            onClick={() => {
              navigate("/signup");
            }}
          >
            <MLTypography>Sign Up</MLTypography>
          </MLButton>
          <MLButton
            variant={"text"}
            onClick={() => {
              console.log(errorsAuthed);
            }}
          >
            <MLTypography>Errors</MLTypography>
          </MLButton>
        </Box>
      </Box>
    </Block>
  );
};

export default LoginPage;
