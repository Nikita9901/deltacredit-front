import React from "react";
import { MLButton, MLModal, MLTypography } from "@moneylend-ui";
import { ModalActionsNew as ModalActions } from "../../../moneylend-ui/components/MLModal/ModalContainer/styles";
// import { useCreditsCsv } from "apis/coin/api";
import { useExportCreditsToCsv, useToast } from "../../../utils/hooks";

function ExportModal({
  close,
  ...props
}: {
  close: () => void;
}): React.ReactElement {
  // const [exportCsv, exportStatus] = useTransactionsHistoryCsvMutation();
  const toast = useToast();
  // const [{ loading }, exportCsv] = useExportCreditsToCsv();

  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/exportToCsv", {
        method: "POST",
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "credits.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка скачивания файла:", error);
    }
  };

  return (
    <MLModal open={false} wide {...props} close={close} title={"Export to csv"}>
      <MLTypography>
        We are creating a report including all the transactions since this
        account was created. We will send you an email in the following 10
        minutes with the steps to download your transactions history report.
      </MLTypography>
      <ModalActions>
        <MLButton
          onClick={close}
          variant="outlined"
          size="large"
          id={"export-transactions__cancel"}
        >
          Cancel
        </MLButton>
        <MLButton
          id={"export-transactions__proceed"}
          onClick={() => {
            handleExport();
            toast.success("Exported");
            close();
          }}
          variant="contained"
          size="large"
        >
          Export
        </MLButton>
      </ModalActions>
    </MLModal>
  );
}

export default ExportModal;
