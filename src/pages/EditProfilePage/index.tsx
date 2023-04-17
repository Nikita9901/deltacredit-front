import React, { useEffect } from "react";
import { MLButton, MLInput } from "@moneylend-ui";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAuthCheck,
  useCurrentUser,
  useEditProfile,
} from "../../utils/hooks";
import { Box } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IEditProfile } from "./types";

const EditProfilePage: React.FC = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [{ loading }, edit] = useEditProfile();
  const user = useCurrentUser();
  // console.log(profileId, user?.id);
  useEffect(() => {
    if (user?.id !== profileId) {
      navigate(`/profile/${user?.id}/edit`);
    }
  }, [user]);
  useAuthCheck();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<IEditProfile>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const handleTransfer: SubmitHandler<IEditProfile> = async ({
    name,
    surname,
    phone_number,
    username,
  }) => {
    const iName = name || user?.name;
    const iSurname = surname || user?.surname;
    const iPhone_number = phone_number || user?.phone_number;
    const iUsername = username || user?.username;
    // console.log(iName, iSurname, iPhone_number, iUsername);
    await edit({
      name: iName,
      surname: iSurname,
      phone_number: iPhone_number,
      username: iUsername,
    });
    navigate(`/profile/${user?.id}`);
  };

  return (
    <>
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
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MLInput type="text" wide label={"Name"} {...field} />
          )}
          name={"name"}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <MLInput type="text" wide label={"Surname"} {...field} />
          )}
          name={"surname"}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <MLInput type="text" wide label={"Phone number"} {...field} />
          )}
          name={"phone_number"}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <MLInput type="text" wide label={"Username"} {...field} />
          )}
          name={"username"}
        />
        <MLButton
          loading={loading}
          size={"large"}
          variant={"contained"}
          type={"submit"}
        >
          Save
        </MLButton>
      </Box>
    </>
  );
};

export default EditProfilePage;
