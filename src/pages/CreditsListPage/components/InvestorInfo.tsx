import React, { useEffect } from "react";
import { Icon } from "./styles";
import { MLTypography } from "@moneylend-ui";
import Box from "@mui/system/Box/Box";
import { generatePath, Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { StyledVerifiedIcon } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetUserById } from "../../../utils/hooks";
import { ICredit } from "../../../models/ICredit";

export const InvestorName = ({
  prefixId,
  credit,
}: {
  prefixId?: string;
  credit: ICredit;
}) => {
  return (
    <Box
      id={prefixId && `${prefixId}__service-${credit.user_id}`}
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
          {credit.name}
        </MLTypography>
        <div>
          <MLTypography variant="body2" fontWeight="medium" color="#706F82">
            {credit.username}
          </MLTypography>
        </div>
      </Box>
    </Box>
  );
};
