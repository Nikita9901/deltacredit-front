import { styled } from "@mui/material";
import Box from "@mui/system/Box/Box";

export const GradientBorderButtonWrapper = styled(Box)`
  background: rgba(8, 43, 66, 0.9);
  border-radius: 4px;
  padding: 1px;
  height: 42px;

  &:hover {
    background: rgba(8, 43, 66, 0.9);

    & > a {
      background: rgba(7, 34, 54, 0.9) !important;
    }
  }

  & > a {
    height: 40px;
    transition: background-color 0.3s;
    background: rgba(4, 20, 31, 0.9) !important;
    border-width: 0 !important;
  }
`;
