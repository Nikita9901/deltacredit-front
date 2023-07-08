import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { MLModal } from "@moneylend-ui";
import BorrowRequestForm from "./components/BorrowRequestForm";
import { useAuthCheck, useIsAuthenticated } from "../../../utils/hooks";
import { useNavigate } from "react-router-dom";

function BorrowRequestModal({
  close,
  action,
  creditId,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
  creditId: number;
} & DialogProps): React.ReactElement {
  useAuthCheck();
  return (
    <MLModal
      authOnly
      wide
      {...props}
      close={close}
      title={"Create borrow request"}
    >
      <BorrowRequestForm close={close} creditId={creditId} />
    </MLModal>
  );
}

BorrowRequestModal.trackId = "borrow-request";

export default BorrowRequestModal;
