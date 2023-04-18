import React from "react";
import { Layout, Header, Title, Body, HeaderButton, Inline } from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ModalContainerProps } from "./types";

function ModalContainer({
  children,
  title = "",
  titleAlign = "left",
  onGoBack = undefined,
  width = 0,
  onClickClose = undefined,
  customHeaderAction = null,
}: ModalContainerProps) {
  return (
    <Layout width={width}>
      <Header compact={!title && !onGoBack}>
        <Inline align={titleAlign}>
          {onGoBack && typeof onGoBack === "function" && (
            <HeaderButton onClick={onGoBack}>
              <KeyboardArrowLeftIcon
                width={"32px"}
                height={"32px"}
                sx={{ color: "#e4e4e7" }}
              />
            </HeaderButton>
          )}
          {!!title && (
            <Title variant="h5" sx={{ paddingRight: "20px" }}>
              {title}
            </Title>
          )}
        </Inline>
        {!customHeaderAction
          ? onClickClose &&
            typeof onClickClose === "function" && (
              <HeaderButton onClick={onClickClose}>
                <CloseIcon sx={{ color: "#e4e4e7" }} />
              </HeaderButton>
            )
          : customHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
