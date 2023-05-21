import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { MLModal } from "@moneylend-ui";
import BorrowRequestForm from "./components/BorrowRequestForm";

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
  console.log(creditId);
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
