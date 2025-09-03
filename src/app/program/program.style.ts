"use client";
import styled, { css } from "styled-components";

import theme from "@styles/theme";

export const Container = styled.ul`
  display: flex;
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
  }
`;

export const CardWrapper = styled.li`
  width: 100%;
  ${theme.devices.tablet} {
    width: calc((100% - 44px) / 2);
  }
  ${theme.devices.desktop} {
    width: calc((100% - 132px) / 4);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 343/430;
  /* border: ${theme.colors.blackColor} 1px solid; */
`;

export const StatusBadge = styled.span<{ $status?: number }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 10px;
  border: ${theme.colors.blackColor} 1px solid;
  font-size: 13px;
  font-family: PretendardBold, sans-serif;

  ${({ $status }) =>
    $status === 1 &&
    css`
      color: ${theme.colors.blackColor};
      background-color: ${theme.colors.pointYellow};
    `}
  ${({ $status }) =>
    $status === 2 &&
    css`
      color: ${theme.colors.blackColor};
      background-color: ${theme.colors.pointYellow};
    `}
  ${({ $status }) =>
    $status === 3 &&
    css`
      color: ${theme.colors.whiteColor};
      background-color: ${theme.colors.activeOrange};
    `}
    ${({ $status }) =>
    $status === 4 &&
    css`
      color: ${theme.colors.blackColor};
      background-color: ${theme.colors.pointYellow};
    `}
`;

export const Description = styled.div`
  margin: 16px 0 0;
  padding: 16px 0;
  width: 100%;

  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.desktop} {
    margin: 32px 0 0;
    padding: 24px 0;
  }
`;
export const Title = styled.h3`
  ${theme.typography.bodyDesktop}
  margin: 0 0 12px;
  font-family: PretendardSemiBold, sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${theme.devices.desktop} {
    ${theme.typography.largeTitle}
    margin: 0 0 20px;
  }
`;
export const Date = styled.div`
  ${theme.typography.headline2}
  display: flex;
  gap: 4px;
  ${theme.devices.desktop} {
    font-size: 15px;
  }
`;
