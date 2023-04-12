import React from "react";
import { Button } from "@mui/material";
import { MLButtonProps } from "./types";
import { StyledButton } from "./styles";

const MLButton = ({ loading, children, ...props }: MLButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
export default MLButton as typeof Button & typeof MLButton;
