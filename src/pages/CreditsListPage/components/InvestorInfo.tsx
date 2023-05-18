import React from "react";
import { Icon } from "./styles";
import { MLTypography } from "@moneylend-ui";
import Box from "@mui/system/Box/Box";
import { generatePath, Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { StyledVerifiedIcon } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetUserById } from "../../../utils/hooks";

export const InvestorName = ({
  prefixId,
  investorId,
}: {
  prefixId?: string;
  investorId: string | undefined;
}) => {
  const investor = useGetUserById(investorId);

  return (
    <Box
      id={prefixId && `${prefixId}__service-${investorId}`}
      component={Link}
      to={generatePath("/")}
      sx={{
        cursor: "pointer",
        alignItems: "center",
        flexDirection: "row",
        display: "flex",
        textAlign: "start",
        width: 300,
      }}
    >
      <Icon>
        <AccountCircleIcon
          sx={{ color: "grey", width: "55px", height: "55px" }}
        />
      </Icon>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <MLTypography fontWeight="medium" color="#C1C1C8" whiteSpace="normal">
          {investor.user.name}
        </MLTypography>
        <div>
          <MLTypography variant="body2" fontWeight="medium" color="#706F82">
            {investor.user.username}
          </MLTypography>
        </div>
      </Box>
    </Box>
  );
};
