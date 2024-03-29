import React from "react";
import { Box, Divider } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { MLButton, MLInput } from "@moneylend-ui";
import { useCreateCredit, useGetCreditsList } from "../../../utils/hooks";

const CreateCreditForm = ({ close }: { close: () => void }) => {
  const [{ loading }, createCredit] = useCreateCredit();
  useGetCreditsList();
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
    period,
    description,
  }) => {
    await createCredit({ amount, percent, period, description });
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
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="text" wide label={"Percent:"} {...field} />
              )}
              name={"percent"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="text" wide label={"Period:"} {...field} />
              )}
              name={"period"}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MLInput type="text" wide label={"Description:"} {...field} />
              )}
              name={"description"}
            />
          </Box>
          <MLButton
            loading={loading}
            size={"large"}
            variant={"contained"}
            type={"submit"}
          >
            Create Credit
          </MLButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCreditForm;
