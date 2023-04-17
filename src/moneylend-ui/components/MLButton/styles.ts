import { styled, Button } from "@mui/material";

export const StyledButton = styled(Button)`
  display: flex;
  &.MuiButton-contained {
    background: #0082b4;
    border-radius: 50px;
    width: 200px;
    height: 50px;
  }
  align-items: center;
  text-align: center;
  letter-spacing: -0.2px;
  &.MuiButton-contained:hover {
    background: #015f82;
  }
`;
