"use client";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

export const Wrapper = styled.footer<{ $hidden: boolean }>`
  padding: 32px 16px;
  background-color: ${theme.colors.componentsBgColor};

  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `};
`;
export const Contents = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
export const SiteMap = styled.div`
  display: grid;
  gap: 16px 0;
  margin-bottom: 32px;
  grid-template-columns: repeat(2, 1fr);

  ${theme.devices.desktop} {
    display: flex;
    align-items: center;
    gap: 0 48px;
    margin-bottom: 32px;
  }
`;
export const MenuLink = styled.div`
  ${theme.typography.bodyMobile};
  font-family: PretendardRegular, sans-serif;
  color: ${theme.colors.deepGrayFontColor};

  ${theme.devices.desktop} {
    height: auto;
    padding: 0;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.65;
  }
`;
export const HospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  font-family: PretendardRegular, sans-serif;
`;
export const InfoText = styled.span`
  ${theme.typography.caption};
  color: ${theme.colors.deepGrayFontColor};
`;
