import { css } from "styled-components";
import { ColumnDef, ColumnHelper, RowData } from "@tanstack/react-table";
export const styledIf = (
  cond: any,
  primaryQuery: string,
  secondaryQuery?: string
) => {
  return !secondaryQuery
    ? cond
      ? primaryQuery
      : ""
    : cond
    ? primaryQuery
    : secondaryQuery;
};

export const NiceScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export function createColumnHelper<
  TData extends RowData
>(): ColumnHelper<TData> {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === "function"
        ? ({
            ...column,
            accessorFn: accessor,
          } as any)
        : {
            ...column,
            accessorKey: accessor,
          };
    },
    display: (column) => column as ColumnDef<TData, unknown>,
    group: (column) => column as ColumnDef<TData, unknown>,
  };
}
