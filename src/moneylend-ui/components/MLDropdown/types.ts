import { PopoverOrigin, PopoverPosition } from "@mui/material/Popover/Popover";

type Option = {
  id?: string;
  label?: string | JSX.Element;
  onClick?: () => void;
  href?: string;
  target?: "_blank";
  active?: boolean;
};

export type MLDropdownOption = Option & {
  id?: string;
  children?: Option[];
  element?: JSX.Element;
  separator?: boolean;
};

export type MLDropdownProps = {
  id?: string;
  options: MLDropdownOption[];
  component: ({ open }: { open: boolean }) => JSX.Element;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  transformOrigin?: PopoverOrigin;
};

export type MLDropdownHandle = {
  closeDropDown?: () => void;
};
