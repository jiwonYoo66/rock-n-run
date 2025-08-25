import Link from "next/link";
import Image from "next/image";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

export const Wrapper = styled.header`
  width: 100%;
  height: 48px;

  ${theme.devices.desktop} {
    height: 52px;
  }
`;
export const Contents = styled.div<{ $isNotDesktop: boolean }>`
  max-width: 1280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin: 0 auto;

  ${theme.devices.desktop} {
    padding: 0 36px;
  }

  ${({ $isNotDesktop }) =>
    $isNotDesktop &&
    css`
      max-width: 720px;

      ${theme.devices.desktop} {
        padding: 0 16px;
      }
    `};
`;
export const FlexibleBox = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled.div<{ $visible: boolean }>`
  width: 74px;
  height: 36px;
  flex: 1;
  cursor: pointer;

  ${({ $visible }) =>
    $visible &&
    css`
      display: none;
    `};
`;
export const NextImage = styled(Image)``;
export const NavList = styled.nav<{ $visible: boolean }>`
  width: 100%;
  flex: 1;
  display: none;
  font-family: PretendardRegular, sans-serif;

  ${({ $visible }) =>
    $visible &&
    css`
      display: flex;
      justify-content: center;
      gap: 0 16px;
    `};
`;
export const NavLink = styled(Link)`
  ${theme.typography.headline2};
  padding: 4px 8px;
  text-align: center;
  position: relative;
  display: none;

  &:after {
    content: "";
    width: 0;
    position: absolute;
    left: 50%;
    bottom: 0;
    transition: 0.25s;
    border-bottom: 2px solid ${theme.colors.blackColor};
  }

  &:hover {
    font-weight: 500;

    &:after {
      width: 100%;
      left: 0;
    }
  }

  ${theme.devices.tablet} {
    display: block;
  }
  ${theme.devices.desktop} {
    display: block;
  }
`;
export const Hamburger = styled.div<{ $hidden: boolean }>`
  min-width: 24px;
  font-size: 24px;
  text-align: right;
  flex: 1;

  & svg {
    cursor: pointer;
  }

  &:hover {
    opacity: 0.6;
  }

  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `};
`;
export const ControlButton = styled.button<{ $visible?: boolean }>`
  display: none;

  ${({ $visible }) =>
    $visible &&
    css`
      display: block;
    `};
  svg {
    color: ${theme.colors.blackColor};
  }
`;
export const Title = styled.h3`
  flex: 1;
  text-align: center;
  font-family: PretendardRegular, sans-serif;
`;

export const HospitalName = styled.h3<{ $visible?: boolean }>`
  ${theme.typography.bodyMobile};
  display: none;
  font-family: PretendardRegular, sans-serif;
  ${({ $visible }) =>
    $visible &&
    css`
      display: block;
    `};
`;
