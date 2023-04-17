import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { MLButtonProps } from "./types";
import { StyledButton } from "./styles";
import MLTypography from "../MLTypography";

const MLButton = ({ loading, children, ...props }: MLButtonProps) => {
  return (
    <StyledButton {...props}>
      {loading ? (
        <CircularProgress size={30} color={"inherit"} />
      ) : (
        <MLTypography>{children}</MLTypography>
      )}
    </StyledButton>
  );
};
export default MLButton as typeof Button & typeof MLButton;
