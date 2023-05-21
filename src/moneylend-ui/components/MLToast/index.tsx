import React from "react";
import { ToasterProps } from "./types";
import * as styled from "./styles";
import { ReactComponent as SuccessIcon } from "../../assets/icons/check-icon.svg";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as ErrorAlertIcon } from "../../assets/icons/error-alert-icon.svg";
import MLTypography from "../MLTypography";

const Toaster = ({
  variant = "error",
  size = "large",
  caption = "",
  id,
}: ToasterProps) => {
  return (
    <styled.ToastContainer variant={variant} size={size} id={id}>
      <styled.IconContainer>
        {variant === "error" && <ErrorAlertIcon color={"#CC3993"} />}
        {variant === "success" && <SuccessIcon color={"#26c496"} />}
        {variant === "info" && <InfoIcon fill={"#35334A"} />}
      </styled.IconContainer>

      <styled.Caption>
        <MLTypography
          variant={size === "large" ? "body1" : "body2"}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */
          color={{ error: "#CC3993", success: "#26c496" }[variant]}
          fontWeight="regular"
        >
          {caption}
        </MLTypography>
      </styled.Caption>
    </styled.ToastContainer>
  );
};

export default Toaster;
