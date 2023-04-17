import React, { useEffect } from "react";
import { MLTypography } from "@moneylend-ui";
import { useGetCreditsList } from "../../utils/hooks";
import Layout from "../../components/Layout";

const CreditsListPage: React.FC = () => {
  const [credits, loading] = useGetCreditsList();
  useEffect(() => {
    console.log(credits);
  }, [loading]);

  return (
    <Layout loading={false}>
      <MLTypography>hifasdfadsfhkadsjgfkjadsgfkjadskjgakdshg</MLTypography>
    </Layout>
  );
};

export default CreditsListPage;
