import React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { MLModal } from "@moneylend-ui";
import CreateCreditForm from "./CreateCreditForm";

function CreateCreditModal({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps): React.ReactElement {
  return (
    <MLModal
      authOnly
      wide
      {...props}
      close={close}
      title={"Create money offer"}
    >
      <CreateCreditForm close={close} />
    </MLModal>
  );
}

CreateCreditModal.trackId = "create-credit";

export default CreateCreditModal;
