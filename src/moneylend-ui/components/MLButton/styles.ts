import { styled, Button } from "@mui/material";

export const StyledButton = styled(Button)`
  display: flex;
  padding: 10px 50px;
  max-height: 50px;
  &.MuiButton-contained {
    background: #0082b4;
    border-radius: 3px;
  }
  align-items: center;
  text-align: center;
  letter-spacing: -0.2px;
  &.MuiButton-contained:hover {
    background: #015f82;
  }
`;
