import React from "react";
import { MLTypographyProps } from "./types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Index: React.FC<MLTypographyProps> = styled<React.FC<MLTypographyProps>>(
  ({ ...props }) => <Typography {...props} />
)`
  color: #e4e4e7;
  font-family: "Poppins";
`;

export default Index as typeof Typography & typeof Index;
