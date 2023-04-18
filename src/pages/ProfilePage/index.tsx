import React, { useEffect } from "react";
import { MLButton, MLTypography } from "@moneylend-ui";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCredit,
  useCurrentUser,
  useGetUserById,
} from "../../utils/hooks";
import Layout from "../../components/Layout";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMLModal } from "@moneylend-ui";
import CreateCreditModal from "./components/CreateCredit";
import { ShowFnOutput } from "mui-modal-provider";

const ProfilePage: React.FC = () => {
  const { showModal } = useMLModal();
  const { profileId } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { user, isLoading } = useGetUserById(profileId);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <Layout loading={isLoading}>
      <Box display={"flex"}>
        <Box>
          <AccountCircleIcon
            sx={{ color: "grey", width: "300px", height: "300px" }}
          />
        </Box>
        <Box>
          {user.name && (
            <MLTypography variant={"h4"}>{`Name: ${user.name}`}</MLTypography>
          )}
          {user.surname && (
            <MLTypography
              variant={"h4"}
            >{`Surname: ${user.surname}`}</MLTypography>
          )}
          {user.email && (
            <MLTypography variant={"h4"}>{`Email: ${user.email}`}</MLTypography>
          )}
          {user.phone_number && (
            <MLTypography
              variant={"h4"}
            >{`Phone: ${user.phone_number}`}</MLTypography>
          )}
        </Box>
        {currentUser?.id?.toString() === user?.id?.toString() && (
          <MLButton
            variant={"contained"}
            onClick={() => {
              navigate(`/profile/${profileId}/edit`);
            }}
          >
            Edit Profile
          </MLButton>
        )}
        {currentUser?.id?.toString() === user?.id?.toString() && (
          <MLButton
            variant={"contained"}
            onClick={() => {
              console.log("hi");
              let modal: ShowFnOutput<void>;
              // @ts-ignore
              showModal(CreateCreditModal);
              // createCredit({
              //   amount: 500,
              //   period: 300,
              //   percent: 25,
              //   description: "first credit for you",
              // });
            }}
          >
            Create Money Offer
          </MLButton>
        )}
      </Box>
    </Layout>
  );
};

export default ProfilePage;
