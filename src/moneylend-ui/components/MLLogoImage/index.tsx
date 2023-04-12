import React from "react";
import { MLLogoImageProps } from "./types";
import { Box } from "@mui/material";

const MLLogoImage = ({ full = false, ...props }: MLLogoImageProps) => {
  return (
    <Box {...props}>
      <img
        src={full ? "/images/fullLogo.svg" : "/images/Logo.svg"}
        alt="Logo"
      />
    </Box>
  );
};

export default MLLogoImage;
