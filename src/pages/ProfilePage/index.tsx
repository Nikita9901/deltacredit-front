import React, { useEffect } from "react";
import { MLButton, MLTypography } from "@moneylend-ui";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCredit,
  useCurrentUser,
  useGetUserById,
  useGetUserCredits,
} from "../../utils/hooks";
import Layout from "../../components/Layout";
import { Box, Grid, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMLModal } from "@moneylend-ui";
import CreateCreditModal from "./components/CreateCredit";
import { ShowFnOutput } from "mui-modal-provider";
import CreditView from "../CreditsListPage/components/CreditView";
import EditIcon from "@mui/icons-material/Edit";

const ProfilePage: React.FC = () => {
  const { showModal } = useMLModal();
  const { profileId } = useParams();
  const currentUser = useCurrentUser();
  const { userCredits, isLoading: loading } = useGetUserCredits(
    profileId?.toString()
  );
  const navigate = useNavigate();
  const { user, isLoading } = useGetUserById(profileId);
  return (
    <Layout loading={isLoading}>
      <Box>
        <Box display={"flex"} marginBottom={"50px"}>
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
              <MLTypography
                variant={"h4"}
              >{`Email: ${user.email}`}</MLTypography>
            )}
            {user.phone_number && (
              <MLTypography
                variant={"h4"}
              >{`Phone: ${user.phone_number}`}</MLTypography>
            )}
          </Box>
          <Box>
            {currentUser?.id?.toString() === user?.id?.toString() && (
              <IconButton
                onClick={() => {
                  navigate(`/profile/${profileId}/edit`);
                }}
              >
                <EditIcon width={24} height={24} sx={{ color: "grey" }} />
              </IconButton>
            )}
          </Box>
          {currentUser?.id?.toString() === user?.id?.toString() && (
            <MLButton
              variant={"contained"}
              onClick={() => {
                // @ts-ignore
                showModal(CreateCreditModal);
              }}
            >
              Create Money Offer
            </MLButton>
          )}
        </Box>
        <MLTypography variant={"h4"} marginBottom={"20px"}>
          User Credits:{" "}
        </MLTypography>
        <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
          {userCredits.map((credit) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                minHeight: "200px",
                minWidth: "320px",
                marginBottom: "20px",
              }}
            >
              <CreditView credit={credit} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
