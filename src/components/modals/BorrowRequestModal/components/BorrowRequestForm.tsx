import React from "react";
import { Box } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { MLButton, MLInput } from "@moneylend-ui";
import { useCreateBorrowRequest } from "../../../../utils/hooks";

const BorrowRequestForm = ({
  close,
  creditId,
}: {
  close: () => void;
  creditId: number;
}) => {
  const [{ loading }, createBorrowRequest] = useCreateBorrowRequest();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ITransferField>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });
  const handleTransfer: SubmitHandler<ITransferField> = async ({
    amount,
    percent,
  }) => {
    await createBorrowRequest({ creditId, amount, percent });
    await close();
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleTransfer)}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
            gap: 2,
          }}
        >
          <Box display={"flex"} flexDirection={"column"} width={"80%"} gap={2}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput wide type="text" label={"Amount (BYN):"} {...field} />
              )}
              name={"amount"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="text" wide label={"Percent (%):"} {...field} />
              )}
              name={"percent"}
            />
          </Box>
          <MLButton
            loading={loading}
            size={"large"}
            variant={"contained"}
            type={"submit"}
          >
            Request lending
          </MLButton>
        </Box>
      </Box>
    </Box>
  );
};

export default BorrowRequestForm;
