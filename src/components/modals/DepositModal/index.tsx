import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { MLModal } from "@moneylend-ui";
import DepositForm from "./components/DepositForm";

function CreateCreditModal({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps): React.ReactElement {
  return (
    <MLModal authOnly wide {...props} close={close} title={"Deposit"}>
      <DepositForm close={close} />
    </MLModal>
  );
}

CreateCreditModal.trackId = "deposit";

export default CreateCreditModal;
