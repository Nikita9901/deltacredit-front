import Popover from "@mui/material/Popover";
import React, { MouseEvent, useEffect, useImperativeHandle } from "react";
import { MLDropdownProps, MLDropdownHandle, MLDropdownOption } from "./types";
import {
  ArrowBottomIconStyled,
  ChildContainer,
  Component,
  ComponentWrapper,
  ZigDropdownContainer,
  NavLink,
  NavList,
  SpaceTaker,
} from "./styles";
import { useTheme } from "styled-components";

// TODO rename to ZigDropdown, add stories
const MLDropdown: (
  props: MLDropdownProps,
  innerRef: React.Ref<MLDropdownHandle>
) => JSX.Element = (
  {
    id,
    component,
    options,
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    },
    anchorPosition,
    transformOrigin = {
      vertical: "top",
      horizontal: "right",
    },
  }: MLDropdownProps,
  innerRef: React.Ref<MLDropdownHandle>
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [childDropdownShow, setChildDropdownShown] =
    React.useState<null | MLDropdownOption>(null);
  const isOpen = !!anchorEl;
  const theme = useTheme();
  const handleToggle = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((v) => (v ? null : event.currentTarget));

  const handleClose = () => {
    setChildDropdownShown(null);
    setAnchorEl(null);
  };

  useImperativeHandle(
    innerRef,
    () => ({
      closeDropDown: () => {
        handleClose();
      },
      open: isOpen,
    }),
    [anchorEl, isOpen]
  );
  const onClick = (f: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleClose();
    // the timeout here is needed because an action can trigger Suspense and then the popover will remain somewhere on the page
    setTimeout(() => {
      if (e.button === 1) {
        // middle button fix for Safari
        window.open(e.currentTarget.href);
      } else {
        f();
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleClose);
    return () => {
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  return (
    <>
      <Component role="button" onClick={handleToggle}>
        {component({ open: isOpen })}
      </Component>
      {options && (
        <Popover
          id="popover-menu"
          anchorEl={anchorEl}
          open={isOpen}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              minWidth: "220px",
              backgroundColor: "rgba(4, 20, 31, 0.9)",
              whiteSpace: "nowrap",
              color: "#fff",
              boxShadow: "0 4px 6px -2px #00000061",
              borderRadius: "4px 0 4px 4px",
              border: "none",
            },
          }}
          onClose={handleClose}
          anchorPosition={anchorPosition}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
        >
          <ZigDropdownContainer id={id}>
            <NavList>
              {options.map((option, i) => {
                // this is a design requirement
                if (childDropdownShow && options.indexOf(childDropdownShow) < i)
                  return null;

                const key =
                  option &&
                  "label" in option &&
                  typeof option.label === "string"
                    ? option.label
                    : Math.random().toString();

                if (option.element)
                  return (
                    <ComponentWrapper
                      id={option.id || `dropdown-element-${i}`}
                      separator={option.separator}
                      key={key}
                    >
                      {option.element}
                    </ComponentWrapper>
                  );

                if (option.href || option.onClick)
                  return (
                    <NavLink
                      id={option.id}
                      key={key}
                      separator={option.separator}
                      target={option?.target}
                      active={option?.active}
                      as={"a"}
                      href={option.href}
                      onClick={option.onClick && onClick(option.onClick)}
                    >
                      {option.label}
                    </NavLink>
                  );

                if (option.children)
                  return (
                    <ChildContainer
                      separator={option.separator}
                      key={key}
                      active={childDropdownShow === option}
                    >
                      <NavLink
                        active={option?.active}
                        id={option.id}
                        notClickable={!option.children?.length}
                        onClick={() =>
                          option.children?.length &&
                          setChildDropdownShown((v) => (v ? null : option))
                        }
                      >
                        {option.label}
                        <SpaceTaker />
                        {!!option.children?.length && (
                          <ArrowBottomIconStyled
                            color={"white"}
                            width={"22px"}
                            height={"22px"}
                          />
                        )}
                      </NavLink>
                      {childDropdownShow === option &&
                        option.children.map((c) => (
                          <NavLink
                            id={c.id}
                            active={c?.active}
                            key={"--sub-" + key + "--" + c.label}
                            onClick={onClick(c.onClick!)}
                          >
                            {c.label}
                          </NavLink>
                        ))}
                    </ChildContainer>
                  );
              })}
            </NavList>
          </ZigDropdownContainer>
        </Popover>
      )}
    </>
  );
};

export default React.forwardRef(MLDropdown);

export type {
  MLDropdownProps,
  MLDropdownHandle as MLDropdownHandleType,
  MLDropdownOption as MLDropdownOptionType,
} from "./types";
