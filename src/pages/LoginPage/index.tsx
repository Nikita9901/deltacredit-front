import React, { useContext } from "react";
import { Block } from "./styles";
import { Box, Divider } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { useNavigate } from "react-router-dom";
import { MLButton, MLInput, MLTypography } from "@moneylend-ui";
import MLLogoImage from "../../moneylend-ui/components/MLLogoImage";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { store } = useContext(Context);

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
    await store.login(email, password);
  };
  return (
    <Block>
      <Box
        component="form"
        onSubmit={handleSubmit(handleTransfer)}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          background: "rgba(4, 20, 31, 0.9)",
          border: "1px solid #002F42",
          borderRadius: "4px",
          width: "70%",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            gap: 2,
          }}
        >
          <MLTypography variant={"h3"}>Login</MLTypography>
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
          <MLButton loading={false} variant={"contained"} type={"submit"}>
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
        </Box>
      </Box>
    </Block>
  );
};

export default observer(LoginPage);
