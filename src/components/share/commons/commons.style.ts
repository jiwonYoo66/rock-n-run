"use client";
import styled, { css } from "styled-components";
import theme from "@styles/theme";
import { FlexBoxType } from "@utils/types";

export const Wrapper = styled.main<{ $padding?: string }>`
  position: relative;
  margin: 0 auto;
  padding: ${({ $padding }) => ($padding ? $padding : "20px 16px")};
  max-width: 719px;
  min-height: calc(100vh - 48px - 485px);
  font-family: PretendardRegular, sans-serif;
  ${theme.devices.tablet} {
    max-width: 1079px;
  }
  ${theme.devices.desktop} {
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
export const ContentsGridList = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
  grid-template-columns: repeat(3, 1fr);

  ${theme.devices.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ContentsList = styled.ul``;
export const DescriptionList = styled.ul`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;
export const Description = styled.li`
  ${theme.typography.bodyMobile};
  color: ${theme.colors.lightGrayFontColor};
  word-break: keep-all;
  list-style: disc;
`;
