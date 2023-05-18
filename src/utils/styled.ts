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
