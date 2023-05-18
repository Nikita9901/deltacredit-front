import React from "react";
import { useGetCreditsList, useGetUserById } from "../../utils/hooks";
import Layout from "../../components/Layout";
import { Box } from "@mui/material";
import { MLTypography } from "@moneylend-ui";
import { useNavigate, useParams } from "react-router-dom";

const CreditPage = () => {
  const [credits, loading] = useGetCreditsList();
  const { creditId } = useParams();
  const navigate = useNavigate();
  const credit = credits.find((offer) => offer.id.toString() === creditId);
  const user = useGetUserById(credit?.user_id);
  return (
    <Layout loading={loading as boolean}>
      <Box>
        <MLTypography>{credit?.amount} BYN</MLTypography>
        <MLTypography>{credit?.percent}%</MLTypography>
        <MLTypography>{credit?.period_date} days</MLTypography>
        <Box sx={{ cursor: "pointer" }}>
          <MLTypography
            color={"darkgray"}
            onClick={() => {
              navigate(`/profile/${user.user.id}`);
            }}
          >
            {user.user.username || user.user.email}
          </MLTypography>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreditPage;
