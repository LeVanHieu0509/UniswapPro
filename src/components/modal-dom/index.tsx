import Icons from "components/icons";
import Portal from "components/portal";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Actions,
  BackgroundModal,
  ContentModal,
  Main,
  Header,
  Title,
  WrapperChildren,
  WrapperModal,
  BorderChildren,
  NoAction,
} from "./styled";
import { ButtonIcon } from "styles/buttons";
import PortalScanBarcode from "components/portal-scan";

export type ModalSizeDesktop = "full" | "huge" | "lg" | "md" | "sm";
export type ModalSizeMobile = "full" | "md";

interface ModalProp {
  sizeMobile?: ModalSizeMobile;
  titleHeaderMb?: string;
  showModal: boolean;
  title?: string | JSX.Element | JSX.Element[];
  onClose?: () => void;
  children: React.ReactNode;
  size?: ModalSizeDesktop;
  style?: any;
  overFlow?: string;
  noPadding?: boolean;
  borderContent?: boolean;
  closeable?: boolean;
  noAction?: boolean;
  onEnd?: Function;
  actions?: JSX.Element | JSX.Element[];
}

const Modal = ({
  sizeMobile = "md",
  titleHeaderMb,
  overFlow,
  showModal,
  onClose,
  title,
  children,
  size = "md",
  actions,
  closeable = true,
  noPadding,
  borderContent,
  onEnd,
  noAction,
  ...other
}: ModalProp) => {
  const ref = useRef(null);

  const checkScroll = () => {
    if (ref.current && onEnd) {
      if (ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + 10) {
        onEnd(true);
      }
    }
  };

  useEffect(() => {
    setTimeout((a) => {
      checkScroll();
    }, 100);
  }, []);
  return showModal ? (
    <PortalScanBarcode>
      <WrapperModal>
        <BackgroundModal onClick={() => closeable && onClose()} />
        <ContentModal mbFull={sizeMobile == "full"} style={noPadding ? { padding: 0 } : {}}>
          <Main
            sizeMobile={sizeMobile}
            overFlow={overFlow}
            size={size}
            style={noPadding ? { padding: 0 } : {}}
            {...other}
          >
            <Header style={noPadding ? { padding: 0 } : {}} isBorderMb={sizeMobile == "full"}>
              {closeable ? (
                <ButtonIcon onClick={onClose}>
                  <Icons icon="close" />
                </ButtonIcon>
              ) : noPadding ? null : (
                <div style={{ height: 35 }} />
              )}
            </Header>

            <WrapperChildren style={noPadding ? { padding: 0 } : {}} onScroll={() => checkScroll()} ref={ref}>
              {title && <Title sizeMobile={sizeMobile}>{title}</Title>}
              {borderContent ? <BorderChildren>{children}</BorderChildren> : children}
            </WrapperChildren>
            {!noAction ? <Actions>{actions}</Actions> : <NoAction />}
          </Main>
        </ContentModal>
      </WrapperModal>
    </PortalScanBarcode>
  ) : null;
};

Modal.Actions = styled.div``;

export default Modal;
