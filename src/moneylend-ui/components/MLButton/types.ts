import { ReactNode } from "react";
import { ButtonProps } from "@mui/material";

export type MLButtonProps = ButtonProps & {
  loading: boolean;
  children: ReactNode;
};
