import React, { useMemo } from "react";
import { StyledSelectWrapper /*, ZigSelectGlobalStyle*/ } from "./styles";
import { ZigSelectOption, ZigSelectProps } from "./types";
import Select, { StylesConfig } from "react-select";
import MLTypography from "../MLTypography";
import { ErrorMessage } from "../MLAlertMessage";

const customStyles = (
  small: boolean,
  userStyles: StylesConfig
): StylesConfig => ({
  ...userStyles,
  menuPortal: (base) => ({
    ...base,
    zIndex: "1500 !important",
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(16, 18, 37) !important",
    border: `1px solid darkgrey !important`,
    color: `lightgrey !important`,
  }),
  option: (base, state) => ({
    ...base,
    ...(small
      ? {
          fontSize: "13px",
          lineHeight: "20px",
        }
      : {}),
    ...(state.isFocused
      ? {
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.1) !important",
        }
      : {}),
    ...(state.isSelected
      ? {
          background: "rgba(255, 255, 255, 0.2) !important",
        }
      : {}),
    ...userStyles.option?.(base, state),
  }),
  singleValue: (base, state) => ({
    ...base,
    display: state.selectProps.menuIsOpen ? "none" : "block",
    ...userStyles.singleValue?.(base, state),
  }),
});

function ZigSelect<T>({
  onChange,
  value,
  label,
  error,
  width,
  placeholder,
  options,
  small = false,
  disabled,
  outlined,
  id,
  styles: userStyles = {},
  ...props
}: ZigSelectProps<T>): JSX.Element {
  const styles = useMemo(
    () => customStyles(small, userStyles),
    [small, userStyles]
  );

  return (
    // @ts-ignore
    <StyledSelectWrapper
      error={error}
      width={width}
      small={small}
      outlined={outlined}
    >
      {label && <MLTypography color={"neutral200"}>{label}</MLTypography>}
      {/*{ZigSelectGlobalStyle}*/}
      <Select
        id={id}
        styles={styles}
        components={{
          IndicatorSeparator: () => null,
        }}
        // if you want to use this inside of a modal, pass it `menuPosition="fixed"`, `menuShouldScrollIntoView={false}` and `menuShouldBlockScroll`
        isOptionDisabled={(option) => !!(option as ZigSelectOption<T>).disabled}
        options={options as unknown as { label: string; value: number }[]}
        isDisabled={disabled}
        onChange={(v) => {
          onChange?.(
            (v as ZigSelectOption<T>)?.value,
            (v as ZigSelectOption<T>) || null
          );
        }}
        menuPortalTarget={document.body}
        placeholder={placeholder || label}
        value={
          options?.find?.(
            (x) => x.value === value || (x as unknown) === value
          ) || null
        }
        classNamePrefix="zig-react-select"
        {...props}
      />
      {!!error && <ErrorMessage text={error} />}
    </StyledSelectWrapper>
  );
}

export default ZigSelect;
