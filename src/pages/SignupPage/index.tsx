import * as React from "react";
import Box from "@mui/material/Box";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { useNavigate } from "react-router-dom";
import { Divider, FormControlLabel, Checkbox } from "@mui/material";
import { MLButton, MLInput, MLTypography } from "@moneylend-ui";
import { Block } from "./styles";
import MLLogoImage from "../../moneylend-ui/components/MLLogoImage";
import { useDispatch } from "react-redux";
import { signup } from "../../store/actions";
import { AppDispatch } from "../../store/store";
import { useCurrentUser } from "../../utils/hooks";
import { useEffect } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const userId = useCurrentUser()?.id;
  useEffect(() => {
    if (userId) {
      navigate(`/profile/${userId}/edit`);
    }
  }, [userId]);

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
    await dispatch(signup(email, password));
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
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
          alignItems={"center"}
        >
          <MLLogoImage full position={"absolute"} />
          <Box
            width={"40%"}
            display={"flex"}
            textAlign={"right"}
            position={"absolute"}
            top={"10.5vw"}
            right={"19%"}
          >
            <MLTypography
              sx={{
                fontSize: "22px",
                lineHeight: "30px",
                letterSpacing: "-2px",
              }}
            >
              The first online borrowing service in Belarus. Quick loans and
              profitable investments.
            </MLTypography>
          </Box>
          <MLTypography
            sx={{
              color: "#bdbdbe",
              position: "absolute",
              bottom: "25px",
              fontSize: "18px",
              lineHeight: "25px",
              letterSpacing: "-2px",
              width: "70%",
            }}
            textAlign={"center"}
          >
            The project was created within the Decree of the President of the
            Republic of Belarus No. 196 dated May 25, 2021.
          </MLTypography>
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
          <MLTypography variant={"h3"}>Sign Up</MLTypography>
          <Box display={"flex"} flexDirection={"column"} width={"65%"} gap={2}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="text" label={"E-mail Address"} {...field} wide />
              )}
              name={"email"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="password" label={"Password"} {...field} wide />
              )}
              name={"password"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput
                  type="password"
                  label={"Repeat Password"}
                  {...field}
                  wide
                />
              )}
              name={"repeat_password"}
            />
            <Box width={"100%"} display={"flex"}>
              <FormControlLabel
                control={<Checkbox defaultChecked color={"default"} />}
                label="Remember me"
              />
            </Box>
          </Box>

          <MLButton loading={false} variant={"contained"} type={"submit"}>
            <MLTypography>Sign Up</MLTypography>
          </MLButton>
          <MLButton
            variant={"text"}
            onClick={() => {
              navigate("/login");
            }}
          >
            <MLTypography>Login</MLTypography>
          </MLButton>
        </Box>
      </Box>
    </Block>
  );
}
