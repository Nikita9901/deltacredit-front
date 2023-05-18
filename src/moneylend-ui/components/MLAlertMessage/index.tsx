import React from "react";

import { Layout, Icon } from "./styles";

import { ZigAlertMessageProps } from "./types";

import { ReactComponent as ErrorAlertIcon } from "../../assets/icons/error-alert-icon.svg";
import MLTypography from "../MLTypography";

function MLAlertMessage({ text, error, warning, id }: ZigAlertMessageProps) {
  return (
    <Layout id={id}>
      <Icon>
        <ErrorAlertIcon
          height="24px"
          width="24px"
          color={error ? "red" : warning ? "yellow" : "darkgrey"}
        />
      </Icon>
      <MLTypography
        variant="body2"
        sx={{ color: error ? "red" : warning ? "yellow" : "darkgrey" }}
      >
        {text}
      </MLTypography>
    </Layout>
  );
}

export default MLAlertMessage;

// added for backwards compatibility
export const ErrorMessage: React.FC<
  Pick<ZigAlertMessageProps, "text" | "id">
> = ({ text, id }) => <MLAlertMessage text={text} error id={id} />;
