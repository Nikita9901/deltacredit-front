import React from "react";
import { MLTypography } from "@moneylend-ui";
import { ICredit } from "../../../models/ICredit";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  useDeleteCredit,
  useGetUserById,
  useToast,
} from "../../../utils/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Loader } from "../../../moneylend-ui/components/MLLoader";

const CreditView = ({ credit }: { credit: ICredit }) => {
  const user = useGetUserById(credit.user_id);
  const toast = useToast();
  const [{ loading }, deleteCredit] = useDeleteCredit();
  return (
    <MLTypography>
      <Box
        sx={{
          background: "rgba(4, 20, 31, 0.9)",
          padding: "20px 10px",
          margin: "5px 0",
          minHeight: "200px",
          minWidth: "300px",
          alignItems: "center",
          border: "1px solid #002F42",
          borderRadius: "4px",
          display: "flex",
          position: "relative",
        }}
      >
        <CloseIcon
          sx={{
            color: "grey",
            width: "25px",
            height: "25px",
            position: "absolute",
            right: "5px",
            top: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            deleteCredit({ creditId: credit?.id });
            toast.success("Deleted");
          }}
        />
        {!loading ? (
          <>
            <AccountCircleIcon
              sx={{
                color: "grey",
                width: "100px",
                height: "100px",
              }}
            />
            <Box>
              <Box>
                <Box>Amount: {credit.amount}</Box>
                <Box>Percent: {credit.percent}%</Box>
                <Box>Period: {credit.period_date} days</Box>
              </Box>
              <Box>
                <MLTypography color={"darkgray"}>
                  {user.user.username || user.user.email}
                </MLTypography>
              </Box>

              <Box>
                <MLTypography color={"grey"} fontSize={"14px"}>
                  {credit.description}
                </MLTypography>
              </Box>
            </Box>
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </MLTypography>
  );
};

export default CreditView;
