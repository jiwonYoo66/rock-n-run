import styled, { css } from "styled-components";

import theme from "@styles/theme";

export const LayoutWrapper = styled.div`
  width: 100%;
  ${theme.devices.desktop} {
    display: flex;
    justify-content: space-around;
    gap: 44px;
  }
`;
export const CalendarWrapper = styled.div`
  display: none;
  ${theme.devices.desktop} {
    display: block;
    width: calc((100% - 132px) / 4);
  }
`;
export const DetailWrapper = styled.div`
  width: 100%;
  ${theme.devices.desktop} {
    padding: 32px 0 0;
    width: calc((100% - 132px) / 4 * 3 + 88px);
    border-top: ${theme.colors.blackColor} 1px solid;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin: 0 0 20px;
  width: 100%;
  aspect-ratio: 343/430;
  ${theme.devices.desktop} {
    width: calc((100% - 88px) / 3);
    margin: 0 0 32px;
  }
`;
export const InfoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${theme.devices.desktop} {
    flex-direction: row;
    gap: 44px;
    flex-wrap: wrap;
  }
`;
export const InfoBlock = styled.li`
  width: 100%;
  ${theme.devices.desktop} {
    width: calc((100% - 88px) / 3);
  }
`;
export const InfoHeader = styled.div`
  ${theme.typography.bodyDesktop}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100%;
  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
  font-family: PretendardSemiBold, sans-serif;
`;
export const InfoContent = styled.div<{
  $fontColor?: string;
  $fontFamily?: string;
}>`
  ${theme.typography.bodyDesktop}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  min-height: 80px;
  text-align: center;
  font-family: PretendardSemiBold, sans-serif;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  white-space: pre-wrap;
`;
export const InfoListWrapper = styled.ul`
  width: 100%;
`;
export const InfoList = styled.li`
  display: flex;
  align-items: center;
  list-style-type: disc;
`;
export const Info = styled.span<{ $disc?: boolean }>`
  ${theme.typography.bodyDesktop}
  flex:1;
  display: inline-block;
  padding: 8px 12px;
  font-family: PretendardMedium, sans-serif;
  ${({ $disc }) =>
    $disc &&
    css`
      display: list-item;
      list-style: disc;
      margin-left: 32px;
      padding: 8px 12px 8px 0;
    `}
`;
export const InfoDetail = styled.div<{ $padding?: string }>`
  position: relative;
  padding: ${({ $padding }) => ($padding ? $padding : 0)};
  width: 100%;
  ${InfoHeader} {
    margin-bottom: 16px;
    ${theme.devices.desktop} {
      margin-bottom: 32px;
    }
  }
`;

export const ProductWrapper = styled.li`
  padding: 24px;
  width: 100%;
  border: ${theme.colors.lightGrayFontColor} 1px solid;
  ${theme.devices.desktop} {
    width: calc((100% - 88px) / 3);
  }
`;
export const ProductBadge = styled.span`
  ${theme.typography.headline1}
  display: inline-block;
  padding: 8px 12px;
  font-family: PretendardMedium, sans-serif;
  border: ${theme.colors.blackColor} 1px solid;
`;
export const ProductPrice = styled.div`
  ${theme.typography.headline1}
  margin: 12px 0 0;
  font-family: PretendardMedium, sans-serif;
`;
export const MobileSubmit = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 12px;
  width: 100%;
  background-color: ${theme.colors.whiteColor};
  border-top: ${theme.colors.ultraLightGrayBgColor} 1px solid;
  z-index: 10;
  ${theme.devices.desktop} {
    display: none;
  }
`;
export const ExpectDate = styled.div`
  ${theme.typography.headline2}
  margin:  0 0 8px;
  text-align: center;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline1}
  }
`;
export const MobileCalendar = styled.div<{ $show?: boolean }>`
  position: fixed;
  bottom: -100%;
  left: 0;
  padding: 32px;
  width: 100%;
  background-color: ${theme.colors.whiteColor};
  border-radius: 40px 40px 0 0;
  border: ${theme.colors.ultraLightGrayBgColor} 1px solid;
  z-index: 9;
  transition: all.3s;
  ${theme.devices.desktop} {
    display: none;
  }
  ${({ $show }) =>
    $show &&
    css`
      bottom: 100px;
    `}
`;
