'use client';
import styled, { css } from 'styled-components';
import theme from '@styles/theme';

export const MobileWrapper = styled.main<{ $isFooter?: boolean; $padding?: string; }>`
  max-width: 720px;
  min-height: ${({ $isFooter }) => `calc(var(--vh, 1vh) * 100 - 52px - ${$isFooter ? 252 + 60 : 0}px)`};
  //min-height: calc(var(--vh, 1vh) * 100 - 52px);
  //min-height: 500px;
  font-family: PretendardRegular, sans-serif;
  padding: ${({ $padding }) => $padding ? $padding : '20px 16px'};
  position: relative;
  margin: 0 auto;

  ${({ $isFooter }) => $isFooter && css`
    min-height: calc(var(--vh, 1vh) * 100 - 52px - 252px - 60px); // footer: 252, bottomNavigator: 60
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
