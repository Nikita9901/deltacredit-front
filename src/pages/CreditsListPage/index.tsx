import React, { useEffect } from "react";
import { useGetCreditsList } from "../../utils/hooks";
import Layout from "../../components/Layout";
import CreditView from "./components/CreditView";
import { Box } from "@mui/material";

const CreditsListPage: React.FC = () => {
  const [credits, loading] = useGetCreditsList();

  return (
    <Layout loading={loading as boolean}>
      <Box display={"flex"} flexDirection={"column"}>
        {credits.map((credit) => (
          <CreditView credit={credit} />
        ))}
      </Box>
    </Layout>
  );
};

export default CreditsListPage;
