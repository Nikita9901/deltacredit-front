import React from "react";
import { MLInputProps } from "./types";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const MLInput: React.FC<MLInputProps> = styled<React.FC<MLInputProps>>(
  ({ error, wide, labelAction, helperText, ...props }) => {
    return (
      <TextField
        {...props}
        label={
          <>
            {props.label}
            {labelAction && <div>hi</div>}
          </>
        }
        variant={"standard"}
        error={!!error}
        helperText={
          typeof error === "string" && error !== ""
            ? error && <div>Error</div>
            : helperText
        }
        InputProps={{ disableUnderline: true, ...(props.InputProps || {}) }}
        InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
      />
    );
  }
)`
  ${(props) => props.wide && "display: block; width: 100%;"};

  .MuiInputLabel-root {
    display: flex;
    position: static;
    flex-direction: row;
    justify-content: space-between;
    line-height: 24px;
    letter-spacing: 0.55px;
    color: #e4e4e7 !important;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    transition: color 0.2s;

    transform: none !important;

    button {
      float: right;
    }
  }

  .MuiInput-root {
    border: 1px solid #334155;
    padding: 8px 24px;
    margin-top: 4px;
    min-height: 0;
    border-radius: 35px;
    display: flex;
    align-items: center;
    transition: border-color 0.2s;

    &.Mui-disabled {
      cursor: not-allowed;
      border-color: white;
    }

    &.Mui-focused,
    &:hover {
      border-color: #4f6688;
    }

    &.Mui-error,
    &.Mui-error:hover,
    &.Mui-error.Mui-focused {
      border-color: white;

      .MuiInputLabel-root {
        color: white;
      }
    }
  }

  .MuiInput-input {
    background: transparent;
    border: none;
    color: #334155 !important;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.55px;
    width: 100%;
    font-family: "Avenir Next", sans-serif;
    box-shadow: none !important;
    resize: none;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
      -webkit-background-clip: text;
    }

    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 50px white inset;
      -webkit-text-fill-color: #333;
    }

    -webkit-text-fill-color: #94a3b8 !important;

    &::placeholder {
      -webkit-text-fill-color: white !important;
    }

    &.Mui-disabled {
      cursor: not-allowed;
      opacity: 0.67;
      color: white !important;
    }
  }
`;

export default MLInput;
