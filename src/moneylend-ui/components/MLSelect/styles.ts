import { Box, styled } from "@mui/material";
// import {GlobalStyleComponent} from "styled-components";
// import { NiceScrollbar } from "../../utils";
import { css } from "@emotion/react";
import { StyledComponent } from "@emotion/styled";
import { BoxTypeMap } from "@mui/system";

type Props = {
  error?: string;
  width?: number;
  small?: boolean;
  outlined?: boolean;
};

export const StyledSelectWrapper: StyledComponent<BoxTypeMap & Props> = styled(
  Box
)<Props>`
  .zig-react-select {
    &__control {
      border: 1px solid
        ${({ error }) => (error ? "red" : "rgba(52, 49, 99, 0.4)")};
      padding: ${({ small }) =>
        small ? "3px 16px 3px 9px" : "11px 24px 11px 16px"};
      margin-top: 4px;
      min-height: ${({ small }) => (small ? "0" : "60px")};
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-wrap: nowrap;
      ${({ outlined }) =>
        css`
          background: ${outlined ? "transparent" : "green"};
          background: ${outlined ? "transparent" : `#13122566`};
        `}
      transition: border-color 0.2s;
      margin-bottom: 3px;

      ${({ width }) =>
        width &&
        `width: ${width}${width?.toString().includes("%") ? "" : "px"}`};

      padding-right: 0;

      &:hover {
        border-color: ${({ error }) =>
          error ? "red" : "rgba(174,170,241,0.4)"};
        ${({ outlined }) =>
          outlined &&
          css`
            background-color: rgba(118, 130, 247, 0.08);
          `}
        ${({ outlined, theme }) =>
          outlined &&
          css`
            .zig-react-select__single-value {
              color: white !important;
            }
          `}
      }

      &--is-focused {
        border: 1px solid ${({ theme, error }) => (error ? "red" : "grey")};
        box-shadow: none !important;
      }
    }

    &__placeholder,
    &__single-value {
      padding: 0;
      margin-left: 0;
    }

    &__value-container {
      ${({ small }) =>
        small &&
        css`
          padding: 0 5px;
        `}
    }

    &__placeholder,
    &__single-value,
    &__input-container,
    &__input {
      font-size: ${({ small }) => (small ? "13px" : "16px")};
      line-height: ${({ small }) => (small ? "15px" : "20px")};
      ${({ small }) =>
        small
          ? css`
              padding-bottom: 1px;
            `
          : ""};
    }

    &__single-value,
    &__input {
      ${({ small }) =>
        small
          ? css`
              height: 13px;
            `
          : ""};
      color: lightgrey !important;
    }

    .zig-react-select__menu {
      border: 1px solid grey !important;
      color: darkgrey !important;
      background: rgba(16, 18, 37) !important;
    }

    &__placeholder {
      color: grey !important;
    }

    &__input-container {
      margin-left: 0;
    }

    &__indicator {
      ${({ width }) =>
        width &&
        width <= 100 &&
        css`
          padding: 0 2px;
        `};
      ${({ small }) =>
        small &&
        css`
          padding: 0 4px;
          width: 22px;
          height: 22px;
        `};
    }
  }
`;
//
// export const MLSelectGlobalStyle = (
//   <GlobalStyleComponent<any, any>
//     styles={css`
//       .zig-react-select {
//         &__menu {
//           &-list {
//             ${NiceScrollbar.toString()};
//           }
//         }
//       }
//     `}
//   />
// );
