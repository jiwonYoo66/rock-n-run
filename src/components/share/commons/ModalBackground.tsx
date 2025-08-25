import React, { ReactNode, RefObject, useEffect, useRef, memo } from "react";
import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5";
import { handleBodyScroll } from "@utils/commons";
import theme from "@styles/theme";
import LoadingSpinner from "@components/share/commons/LoadingSpinner";

type ModalBackgroundProps = {
  FULL_PAGE?: boolean;
  POPUP?: boolean;
  NO_HEADER?: boolean;
  width?: number;
  height?: string;
  overflow?: string;
  title?: string;
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalBackground = ({
  FULL_PAGE,
  POPUP,
  NO_HEADER,
  width,
  height = "200px",
  overflow,
  title,
  visible,
  loading,
  onClose,
  children,
}: ModalBackgroundProps) => {
  const bgRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const modalRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      visible &&
      bgRef?.current?.contains(e.target as HTMLDivElement) &&
      !modalRef?.current?.contains(e.target as HTMLDivElement)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      handleBodyScroll("hidden");
    } else {
      handleBodyScroll("initial");
    }
  }, [visible]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <Wrapper ref={bgRef} $visible={visible}>
      <ModalBox
        $fullPage={FULL_PAGE}
        $popup={POPUP}
        $width={width}
        $height={height}
        $overflow={overflow}
        ref={modalRef}
      >
        {loading && <LoadingSpinner DISABLED />}
        {!NO_HEADER && (
          <ModalHeader $fullPage={FULL_PAGE}>
            {title && <Title>{title}</Title>}
            <CloseButton onClick={onClose}>
              <IoClose fontSize={26} color={theme.colors.blackColor} />
            </CloseButton>
          </ModalHeader>
        )}
        {children}
      </ModalBox>
    </Wrapper>
  );
};

export default memo(ModalBackground);

const Wrapper = styled.div<{ $visible?: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.25s;
  opacity: 0;
  visibility: hidden;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      z-index: 30;
      visibility: visible;
    `};
`;
const ModalBox = styled.div<{
  $fullPage?: boolean;
  $popup?: boolean;
  $width?: number;
  $height?: string;
  $overflow?: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  max-width: ${({ $width }) => ($width ? $width : 500)}px;
  min-height: ${({ $height }) => $height};
  padding: 32px 16px;
  position: relative;
  background-color: ${theme.colors.whiteColor};
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  transition: 0.25s;
  overflow: ${({ $overflow }) => ($overflow ? $overflow : "initial")};

  ${theme.devices.desktop} {
    padding: 26px 26px 32px;
  }

  ${({ $fullPage }) =>
    $fullPage &&
    css`
      ${theme.devices.mobile} {
        width: 100%;
        max-width: 100%;
        height: 100vh;
      }
    `};

  ${({ $popup }) =>
    $popup &&
    css`
      width: 100%;
      max-width: 100%;
      height: 100vh;
      padding: 0 16px 32px;
    `};
`;
const Title = styled.div`
  font-family: PretendardMedium, sans-serif;
  ${theme.typography.headline2};

  ${theme.devices.mobile} {
    ${theme.typography.bodyMobile};
  }
`;
const ModalHeader = styled.div<{ $fullPage?: boolean }>`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  ${theme.devices.mobile} {
    margin-bottom: 18px;
  }

  ${({ $fullPage }) =>
    $fullPage &&
    css`
      ${theme.devices.mobile} {
        height: auto;
        flex-direction: column-reverse;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 16px 0;
      }
    `};
`;
const CloseButton = styled.button`
  cursor: pointer;
`;
