import React, { useEffect, useState } from "react";
import { MLButton, MLTypography, useMLModal } from "@moneylend-ui";
import BorrowRequestModal from "../../../components/modals/BorrowRequestModal";
import { ICredit } from "../../../models/ICredit";
import {
  useCurrentUser,
  useGetBorrowRequestsCredit,
} from "../../../utils/hooks";
import { Box } from "@mui/material";
import { Loader } from "@zignaly-open/ui";
import { IBorrow } from "../../../models/IBorrow";

const ActionCredits = ({
  credit,
  borrows,
  isLoading = false,
}: {
  credit: ICredit;
  borrows: IBorrow[];
  isLoading: boolean;
}) => {
  const { showModal } = useMLModal();
  const borrowed = borrows?.find(
    (x) => x?.money_offer_id?.toString() === credit?.id.toString()
  );
  if (isLoading) return <Loader color={"grey"} ariaLabel={""} />;
  if (borrowed)
    return (
      <Box>
        <MLTypography color={"grey"}>Requested</MLTypography>
      </Box>
    );
  return (
    <div>
      <MLButton
        onClick={() => {
          // @ts-ignore
          showModal(BorrowRequestModal, { creditId: credit.id });
        }}
      >
        Borrow request
      </MLButton>
    </div>
  );
};

export default ActionCredits;
