import React, { useMemo } from "react";
import { Box, Divider } from "@mui/material";
import { MLButton, MLTypography, useMLModal } from "@moneylend-ui";
import { ChevronRight } from "@mui/icons-material";
import { GradientBorderButtonWrapper } from "./styles";
import { useCurrentUser, useGetUserCredits } from "../../../utils/hooks";
import DepositModal from "../../modals/DepositModal";

const BalanceButton = () => {
  const user = useCurrentUser();
  const { isLoading, userCredits } = useGetUserCredits(user?.id);
  const { showModal } = useMLModal();

  const balanceAvailable = useMemo(() => {
    return userCredits?.reduce(
      (total, credit) => total - credit.amount,
      user?.wallet
    );
  }, [user, userCredits]);

  return (
    <GradientBorderButtonWrapper>
      <MLButton
        component={"a"}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          px: 1,
          py: 0.5,
        }}
        variant="outlined"
        onClick={() => {
          // @ts-ignore
          showModal(DepositModal);
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: "flex",
              ml: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box gap={1} display="flex" justifyContent="space-between">
              <MLTypography variant="body2" color="#89899A" fontSize="12px">
                Balance:
              </MLTypography>
              <MLTypography fontSize="12px">{user?.wallet} BYN</MLTypography>
            </Box>
            <Box gap={1} display="flex" justifyContent="space-between">
              <MLTypography variant="body2" color="#89899A" fontSize="12px">
                Available
              </MLTypography>
              <MLTypography fontSize="12px">
                {balanceAvailable} BYN
              </MLTypography>
            </Box>
          </Box>
          <Divider
            variant="middle"
            orientation="vertical"
            sx={{
              borderColor: "#35334A",
              mx: 1.5,
              my: 0,
            }}
            flexItem
          />
          <Box
            display="flex"
            sx={{
              maxWidth: 113,
            }}
            alignItems="center"
          >
            <MLTypography
              variant="body2"
              color="#89899A"
              textAlign="center"
              fontSize="12px"
            >
              Deposit
            </MLTypography>
            <ChevronRight sx={{ color: "#89899A" }} />
          </Box>
        </Box>
      </MLButton>
    </GradientBorderButtonWrapper>
  );
};

export default BalanceButton;
