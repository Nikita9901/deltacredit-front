import React from "react";
import { Box, Divider } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITransferField } from "./types";
import { MLButton, MLInput, MLTypography } from "@moneylend-ui";
import { useCreateCredit } from "../../../utils/hooks";

const CreateCreditForm = ({ close }: { close: () => void }) => {
  const [{ loading }, createCredit] = useCreateCredit();
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
    close();
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleTransfer)}
        // sx={{
        //   background: "rgba(4, 20, 31, 0.9)",
        //   border: "1px solid #002F42",
        //   borderRadius: "4px",
        //   width: "70%",
        //   minHeight: "500px",
        //   display: "flex",
        // }}
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
