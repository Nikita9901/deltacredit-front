import React from "react";
import { MLTypography } from "@moneylend-ui";
import { ICredit } from "../../../models/ICredit";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useGetUserById } from "../../../utils/hooks";

const CreditView = ({ credit }: { credit: ICredit }) => {
  const navigate = useNavigate();
  const user = useGetUserById(credit.user_id);
  return (
    <MLTypography>
      <Box
        onClick={() => {
          navigate(`/credits/${credit.id}`);
        }}
        sx={{
          background: "rgba(4, 20, 31, 0.9)",
          padding: "20px 10px",
          margin: "5px 0",
          minHeight: "200px",
          minWidth: "300px",
          alignItems: "center",
          border: "1px solid #002F42",
          borderRadius: "4px",
          display: "flex",
          cursor: "pointer",
          transition: ".3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
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
            <MLTypography color={"darkgray"}>
              {user.user.username || user.user.email}
            </MLTypography>
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
