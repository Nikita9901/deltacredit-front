import React, { useEffect } from "react";
import { MLButton, MLTypography } from "@moneylend-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserById } from "../../utils/hooks";
import Layout from "../../components/Layout";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage: React.FC = () => {
  const { profileId } = useParams();
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
        {profileId?.toString() === user?.id?.toString() && (
          <MLButton
            variant={"contained"}
            onClick={() => {
              navigate(`/profile/${profileId}/edit`);
            }}
          >
            Edit Profile
          </MLButton>
        )}
      </Box>
    </Layout>
  );
};

export default ProfilePage;
