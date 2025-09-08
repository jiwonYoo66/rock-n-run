"use client";
import styled, { css } from "styled-components";
import theme from "@styles/theme";
import { FlexBoxType } from "@utils/types";

export const Wrapper = styled.main<{ $padding?: string }>`
  position: relative;
  margin: 0 auto;
  padding: ${({ $padding }) => ($padding ? $padding : "0 16px")};
  max-width: 719px;
  min-height: calc(100vh - 48px - 485px);
  font-family: PretendardRegular, sans-serif;
  ${theme.devices.tablet} {
    max-width: 1079px;
  }
  ${theme.devices.desktop} {
    padding: 0;
    max-width: 1640px;
    min-height: calc(100vh - 105px - 425px);
  }
`;

export const Container = styled.div<{
  $padding?: string;
  $height?: string;
  $isMobile?: boolean;
  $isDesktop?: boolean;
}>`
  position: relative;
  margin: 0 auto;
  padding: ${({ $padding }) => ($padding ? $padding : "0")};
  width: 100%;
  max-width: 719px;
  height: ${({ $height }) => ($height ? $height : "auto")};
  font-family: PretendardRegular, sans-serif;

  /* background-color: tomato; */
  ${theme.devices.tablet} {
    max-width: 1079px;
    /* background-color: saddlebrown; */
  }
  ${theme.devices.desktop} {
    max-width: 1640px;
    /* background-color: gold; */
  }

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      ${theme.devices.desktop} {
        display: none;
      }
    `};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      display: none;
      ${theme.devices.desktop} {
        display: block;
      }
    `};
`;
export const FlexBox = styled.div<FlexBoxType>`
  display: flex;
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
  flex-direction: ${({ $flexDirection }) =>
    $flexDirection ? $flexDirection : "row"};
  align-items: ${({ $alignItems }) => ($alignItems ? $alignItems : "center")};
  justify-content: ${({ $justifyContent }) =>
    $justifyContent ? $justifyContent : "flex-start"};
  flex-wrap: ${({ $flexWrap }) => ($flexWrap ? $flexWrap : "unset")};
  gap: ${({ $gap }) => ($gap ? $gap : 0)}px;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  padding: ${({ $padding }) => ($padding ? $padding : 0)};
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => ($height ? $height : "auto")};
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 15)}px;
  font-family:
    ${({ $fontFamily }) => ($fontFamily ? $fontFamily : "PretendardRegular")},
    sans-serif;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
`;

export const StatusBadge = styled.span<{ $margin?: string; $status?: number }>`
  ${theme.typography.bodyMobile}
  display:inline-block;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  width: 22px;
  height: 22px;
  font-family: PretendardBold, sans-serif;
  text-align: center;
  border-radius: 50%;
  ${({ $status }) =>
    $status === 1 &&
    css`
      color: ${theme.colors.whiteColor};
      background-color: ${theme.colors.activeOrange};
    `}

  ${({ $status }) =>
    $status === 2 &&
    css`
      color: ${theme.colors.blackColor};
      background-color: ${theme.colors.pointYellow};
    `}
`;

export const MobileWrapper = styled.main<{
  $isFooter?: boolean;
  $padding?: string;
}>`
  max-width: 720px;
  min-height: ${({ $isFooter }) =>
    `calc(var(--vh, 1vh) * 100 - 52px - ${$isFooter ? 252 + 60 : 0}px)`};
  //min-height: calc(var(--vh, 1vh) * 100 - 52px);
  //min-height: 500px;
  font-family: PretendardRegular, sans-serif;
  padding: ${({ $padding }) => ($padding ? $padding : "20px 16px")};
  position: relative;
  margin: 0 auto;

  ${({ $isFooter }) =>
    $isFooter &&
    css`
      min-height: calc(
        var(--vh, 1vh) * 100 - 52px - 252px - 60px
      ); // footer: 252, bottomNavigator: 60
      padding-bottom: 100px;

      ${theme.devices.desktop} {
        min-height: calc(var(--vh, 1vh) * 100 - 52px - 214px);
      }
    `};
`;

export const CardContainer = styled.ul`
  display: grid;
  gap: 32px;
  padding: 0 0 52px;

  border-bottom: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 44px;
  }
  ${theme.devices.desktop} {
    grid-template-columns: repeat(4, minmax(237px, 1fr));
    gap: 32px 44px;
    padding: 32px 0 60px;
    border-top: ${theme.colors.blackColor} 1px solid;
  }
  /* display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 0 52px;
    border-bottom: ${theme.colors.blackColor} 1px solid;
    ${theme.devices.tablet} {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 32px 44px;
    }
    ${theme.devices.desktop} {
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 32px 44px;
        padding: 32px 0 60px;
        border-top: ${theme.colors.blackColor} 1px solid;
    } */
`;

export const AuthWrapper = styled.div`
  margin: 130px auto 0;
  width: 345px;
`;

export const AuthTitle = styled.h2<{ $margin?: string }>`
  ${theme.typography.largeTitle}
  margin:${({ $margin }) => ($margin ? $margin : "0 0 20px")};
  font-family: PretendardMedium, sans-serif;
  text-align: center;
`;

export const AuthDescription = styled.div`
  ${theme.typography.bodyMobile}
  margin: 0 0 48px;
  font-family: PretendardRegular, sans-serif;
  text-align: center;
  color: ${theme.colors.grayFontColor};
`;
