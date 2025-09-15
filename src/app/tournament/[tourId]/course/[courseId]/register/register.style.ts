import styled, { css } from "styled-components";

import theme from "@styles/theme";

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.lightGrayBorderColor};
`;
export const Box = styled.div`
  position: relative;
  margin-left: 26px;
`;
export const Label = styled.label<{
  $fontSize?: number;
  $fontColor?: string;
  $fontFamily?: string;
  $margin?: string;
  $top?: number;
}>`
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 16)}px;
  font-family:
    ${({ $fontFamily }) => ($fontFamily ? $fontFamily : "PretendardRegular")},
    sans-serif;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  padding-top: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 4px;
  cursor: pointer;

  ${theme.devices.desktop} {
    font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 18)}px;
  }

  &:before {
    content: "";
    display: inline-block;
    top: ${({ $top }) => ($top ? $top : 5)}px;
    left: -22px;
    vertical-align: top;
    -webkit-transition: -webkit-transform 0.4s
      cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    z-index: 1;
    width: 10px;
    height: 4px;
    border-top-style: none;
    border-right-style: none;
    border-width: 2px;
    position: absolute;
    cursor: pointer;
  }

  &:after {
    content: "";
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    margin-left: -20px;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    border-radius: 2px;
    border: ${theme.colors.blackColor} 1px solid;
  }
`;
export const Input = styled.input`
  display: none;
  /* position: absolute;
  opacity: 0;
  z-index: -1; */
  &:checked + ${Label} {
    &:before {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      border-bottom-style: solid;
      border-left-style: solid;
      border-color: ${theme.colors.whiteColor};
    }

    &:after {
      border-color: ${theme.colors.blackColor};
      background-color: ${theme.colors.blackColor};
    }
  }
`;

export const SectionHeader = styled.div`
  ${theme.typography.bodyDesktop}
  padding: 16px 20px;
  width: 100%;
  font-family: PretendardSemiBold, sans-serif;
  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.desktop} {
    ${theme.typography.largeTitle}
  }
`;
export const Section = styled.div<{ $margin?: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: ${({ $margin }) => ($margin ? $margin : "32px 0")};
  width: 100%;
  ${theme.devices.desktop} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px 44px;
  }
`;
export const InputWrapper = styled.div`
  width: 100%;
  ${theme.devices.desktop} {
    width: calc((100% - 44px) / 2);
  }
`;
export const InputTitle = styled.div`
  display: none;
  ${theme.devices.desktop} {
    ${theme.typography.largeTitle}
    display: block;
    margin: 32px 0 0;
    padding: 14px 20px;
    width: 375px;
    font-family: PretendardSemiBold, sans-serif;
  }
`;
export const InputMobileTitle = styled.div`
  ${theme.typography.bodyDesktop}
  width: auto;
  font-family: PretendardSemiBold, sans-serif;
  ${theme.devices.desktop} {
    display: none;
  }
`;
export const EngNameWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  ${theme.devices.desktop} {
    width: calc((100% - 44px) / 2);
  }
`;
export const Description = styled.div`
  ${theme.typography.caption}
  margin: 12px 0 180px;
  color: ${theme.colors.activeOrange};
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
export const GroupInputWrapper = styled.div`
  width: 100%;
  ${theme.devices.desktop} {
    width: calc(100% - 420px);
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 44px;
  padding: 32px 0;
  width: 100%;
  border-top: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.desktop} {
    margin-left: 420px;
    width: calc(100% - 420px);
  }
`;
export const ExcelButton = styled.button`
  ${theme.typography.headline2}
  display: flex;
  gap: 10px;
  padding: 4px 12px;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;
