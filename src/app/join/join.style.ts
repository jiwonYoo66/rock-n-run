"use client";
import Link from "next/link";
import styled from "styled-components";
import { lighten } from "polished";

import theme from "@styles/theme";

export const LinkButton = styled(Link)`
  padding: 0 8px;
  color: ${theme.colors.grayFontColor};
  font-size: 14px;
  &:last-of-type {
    padding: 0 0 0 8px;
    border-left: ${theme.colors.grayFontColor} 1px solid;
  }
`;

export const Line = styled.div`
  width: 130px;
  height: 1px;
  background-color: ${theme.colors.ultraLightGrayBgColor};
`;

export const LoginText = styled.span`
  color: ${theme.colors.grayFontColor};
  font-size: 14px;
`;
export const CompanyTitle = styled.span`
  padding: 0 4px;
  color: ${theme.colors.blackColor};
  font-family: PretendardSemiBold, sans-serif;
`;

export const SocialLogin = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 12px;
  width: 100%;
  height: 50px;
  background-color: ${theme.colors.whiteColor};
  border: ${theme.colors.lightGrayBorderColor} 1px solid;
  font-size: 18px;
  font-family: PretendardMedium, sans-serif;
  transition: 0.15s;
  &:last-of-type {
    margin: 0;
  }
  &:hover {
    background-color: ${lighten(0.03, theme.colors.whiteHoverColor)};
  }
`;

export const SocialLogo = styled.img`
  position: absolute;
  top: 13px;
  left: 16px;
  display: block;
  width: 24px;
  height: 24px;
`;
