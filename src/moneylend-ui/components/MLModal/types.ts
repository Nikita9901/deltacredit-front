import { DialogProps } from "@mui/material/Dialog";
import { ShowFnOutput, UseModalOptions } from "mui-modal-provider";

export type MLModalProps = {
  title?: string;
  wide?: boolean;
  authOnly?: boolean;
  isLoading?: boolean;
  onGoBack?: () => void;
  width?: number;
  close?: () => void;
  titleAlign?: "center" | "left";
} & DialogProps;

export type UseMLModalOptions = UseModalOptions & {
  customClose?: (modal?: ShowFnOutput<void>) => void;
};

export type MLDialogProps = DialogProps & { close: () => void };
