import React from "react";
import { MLTypography } from "@moneylend-ui";
import { ICredit } from "../../../models/ICredit";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CreditView = ({ credit }: { credit: ICredit }) => {
  console.log(credit);
  return (
    <MLTypography>
      <Box
        sx={{
          background: "rgba(4, 20, 31, 0.9)",
          padding: "10px 10px",
          margin: "5px 0",
          border: "1px solid #002F42",
          borderRadius: "4px",
          width: "100%",
          display: "flex",
        }}
      >
        <AccountCircleIcon
          sx={{ color: "grey", width: "100px", height: "100px" }}
        />
        <Box>
          <Box>
            <Box>Amount: {credit.amount}</Box>
            <Box>Percent: {credit.percent}%</Box>
            <Box>Period: {credit.period_date} days</Box>
          </Box>

          <Box>
            <MLTypography color={"grey"} fontSize={"14px"}>
              {credit.description}
            </MLTypography>
          </Box>
        </Box>
      </Box>
    </MLTypography>
  );
};

export default CreditView;
