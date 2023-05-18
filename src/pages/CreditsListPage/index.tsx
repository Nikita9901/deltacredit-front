import React, { useMemo } from "react";
import { useGetCreditsList, useGetUserById } from "../../utils/hooks";
import Layout from "../../components/Layout";
import CreditView from "./components/CreditView";
import { Box, Grid } from "@mui/material";
import { createColumnHelper } from "../../moneylend-ui/utils";
import { ICredit } from "../../models/ICredit";
import MLTable from "../../moneylend-ui/components/MLTable";
import { MLButton } from "@moneylend-ui";
import { InvestorName } from "./components/InvestorInfo";

const CreditsListPage: React.FC = () => {
  const [credits, loading] = useGetCreditsList();

  const columnHelper = createColumnHelper<ICredit>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "Investor",
        id: "investor",
        cell: ({ row: { original } }) => (
          <InvestorName investorId={original.user_id} />
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ getValue, row: { original } }) => <Box>{getValue()} BYN</Box>,
      }),
      columnHelper.accessor("percent", {
        id: "percent",
        header: "Percent",
        cell: ({ getValue, row }) => <Box>{getValue()} %</Box>,
        sortingFn: "alphanumeric",
      }),
      columnHelper.accessor("period_date", {
        id: "period_date",
        header: "Period",
        cell: ({ getValue, row }) => <Box>{getValue()}</Box>,
        sortingFn: "alphanumeric",
      }),
      columnHelper.display({
        header: "",
        id: "action",
        cell: (props) => <MLButton>Borrow request</MLButton>,
      }),
    ],
    [columnHelper, credits]
  );

  return (
    <Layout loading={loading as boolean}>
      <Box>
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
