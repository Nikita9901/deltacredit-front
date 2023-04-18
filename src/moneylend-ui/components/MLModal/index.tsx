import React, { useEffect } from "react";
import { CircularProgress, Modal as MuiModal } from "@mui/material";
import { LoaderContainer } from "./styles";
import ModalContainer from "./ModalContainer";
import { MLModalProps } from "./types";
import { useIsAuthenticated } from "../../../utils/hooks";
import AuthenticatedWall from "../../../utils/walls/AuthenticatedWall";

const MLModal: React.FC<MLModalProps> = ({
  close,
  isLoading,
  authOnly,
  children,
  onGoBack,
  title,
  width,
  wide,
  titleAlign,
  ...props
}): React.ReactElement => {
  const [isAuthenticated, loading] = useIsAuthenticated();
  return (
    <MuiModal
      {...props}
      onClose={close}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <ModalContainer
        width={(wide && 500) || width}
        title={title}
        onClickClose={close}
        onGoBack={onGoBack}
        titleAlign={titleAlign}
      >
        {isLoading ? (
          <LoaderContainer>
            <CircularProgress color={"inherit"} />
          </LoaderContainer>
        ) : authOnly && !isAuthenticated ? (
          <AuthenticatedWall />
        ) : (
          <>{children}</>
        )}
      </ModalContainer>
    </MuiModal>
  );
};

export default MLModal;
