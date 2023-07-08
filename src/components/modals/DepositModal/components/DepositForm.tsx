import React from "react";
import { Box, Divider } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { MLButton, MLInput } from "@moneylend-ui";
import {
  useCurrentUser,
  useDepositAmount,
  useToast,
} from "../../../../utils/hooks";

interface ITransferField {
  amount: number;
}

const DepositForm = ({ close }: { close: () => void }) => {
  const [{ loading }, deposit] = useDepositAmount();
  const userId = useCurrentUser()?.id;
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ITransferField>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });
  const handleTransfer: SubmitHandler<ITransferField> = async ({ amount }) => {
    deposit({ amount, userId });
    toast.success("deposited");
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
                <MLInput wide type="text" label={"Amount:"} {...field} />
              )}
              name={"amount"}
            />
          </Box>
          <MLButton
            size={"large"}
            variant={"contained"}
            type={"submit"}
            loading={loading}
          >
            Deposit
          </MLButton>
        </Box>
      </Box>
    </Box>
  );
};

export default DepositForm;
