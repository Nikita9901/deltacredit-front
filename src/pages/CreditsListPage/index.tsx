import React, { useEffect, useMemo } from "react";
import {
  useCurrentUser,
  useGetCreditsList,
  useGetUserBorrows,
} from "../../utils/hooks";
import Layout from "../../components/Layout";
import { Box } from "@mui/material";
import { createColumnHelper } from "../../moneylend-ui/utils";
import { ICredit } from "../../models/ICredit";
import MLTable from "../../moneylend-ui/components/MLTable";
import { InvestorName } from "./components/InvestorInfo";
import Action from "../ProfilePage/components/Action";
import { MLButton, useMLModal } from "@moneylend-ui";
import ExportModal from "../../components/modals/ExportModal";

const CreditsListPage: React.FC = () => {
  const [credits, loading] = useGetCreditsList();
  const { isLoading, borrows } = useGetUserBorrows();
  const { showModal } = useMLModal();

  const columnHelper = createColumnHelper<ICredit>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "Investor",
        id: "investor",
        cell: ({ row: { original } }) => <InvestorName credit={original} />,
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ getValue }) => <Box>{getValue()} BYN</Box>,
      }),
      columnHelper.accessor("percent", {
        id: "percent",
        header: "Percent",
        cell: ({ getValue }) => <Box>{getValue()} %</Box>,
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("period_date", {
        id: "period_date",
        header: "Period",
        cell: ({ getValue }) => <Box>{getValue()}</Box>,
        sortingFn: "alphanumeric",
      }),
      columnHelper.display({
        header: "",
        id: "action",
        cell: ({ row: { original } }) => (
          <Action credit={original} borrows={borrows} isLoading={isLoading} />
        ),
      }),
    ],
    [borrows, isLoading, credits]
  );

  return (
    <Layout loading={loading as boolean}>
      <Box>
        <MLButton
          onClick={() => {
            // @ts-ignore
            showModal(ExportModal);
          }}
        >
          Export to csv
        </MLButton>
        <MLTable
          prefixId={"credits"}
          columns={columns}
          data={credits}
          initialState={{
            sorting: [
              {
                id: "amount",
                desc: true,
              },
            ],
          }}
        />
      </Box>

      {/*<Grid container spacing={2} display={"flex"} justifyContent={"center"}>*/}
      {/*  {credits.map((credit) => (*/}
      {/*    <Grid*/}
      {/*      item*/}
      {/*      xs={12}*/}
      {/*      sm={6}*/}
      {/*      md={4}*/}
      {/*      lg={3}*/}
      {/*      sx={{*/}
      {/*        minHeight: "200px",*/}
      {/*        minWidth: "320px",*/}
      {/*        marginBottom: "20px",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <CreditView credit={credit} />*/}
      {/*    </Grid>*/}
      {/*  ))}*/}
      {/*</Grid>*/}
    </Layout>
  );
};

export default CreditsListPage;
