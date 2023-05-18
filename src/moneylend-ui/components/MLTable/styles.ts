import { ExpandMore } from "@mui/icons-material";
import { css, styled } from "@mui/system";
import { SortDirection } from "@tanstack/react-table";
import { IconButton } from "@mui/material";

export const TableContainer = styled("div")`
  overflow: hidden;
`;

export const Table = styled("table")`
  border-spacing: 0;
  width: 100%;
  border-radius: 16px;

  thead {
    height: 56px;
    user-select: none;
    background: rgba(4, 20, 31, 0.9);
    box-shadow: 0 0 10px #16192b;
  }

  th {
    color: white;
    font-size: 16px;
    white-space: nowrap;
    padding: 4px 10px;
  }

  td {
    color: grey;
    padding: 12px 22px;
    white-space: nowrap;
    height: 95px;
    border-bottom: 1px solid rgba(52, 49, 99, 0.4);
    text-align: center;
  }

  tbody {
    tr {
      background: #13122566;

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;

export const SortIcon = styled(ExpandMore, {
  shouldForwardProp: (prop) => prop !== "isSorted",
})<{ isSorted: false | SortDirection }>`
  transition: all 0.1s linear;

  ${({ isSorted }) =>
    !isSorted
      ? css`
          visibility: none;
          opacity: 0;
          margin-left: -24px;
        `
      : isSorted === "asc"
      ? css`
          transform: rotate(180deg);
        `
      : ``}
`;

export const PageNumberContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 41px;
  height: 36px;
  border-radius: 5px;
  background: #13122566;
  box-shadow: inset 0px 0px 0px 1px rgba(52, 49, 99, 0.4);
`;

export const SmallSelectWrapper = styled("div")`
  min-width: 84px;

  .zig-react-select {
    &__control {
      min-height: 36px !important;
      padding: 0 !important;
    }
  }
`;

export const HeaderIconButton = styled(IconButton)`
  margin-left: -20px;
`;

export const SortBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "canSort",
})<{ canSort: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  ${({ canSort }) =>
    canSort &&
    css`
      cursor: pointer;
    `}
`;
