import React, { ReactElement } from "react";
import { Box, CircularProgress } from "@mui/material";

type LayoutProps = {
  loading?: boolean | boolean[];
  children: ReactElement;
};
const Layout = ({ loading, children }: LayoutProps): ReactElement => {
  const isArray = Array.isArray(loading);
  const loadings = isArray ? loading : [loading];
  const isLoading = loadings.some((x) => x);

  return isLoading ? (
    <CircularProgress size={70} color={"primary"} />
  ) : (
    <Box
      display={"flex"}
      width={"100vw"}
      padding={"0 12%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );
};

export default Layout;
