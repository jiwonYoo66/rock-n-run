"use client";
import React from "react";
import Image from "next/image";
import styled, { css } from "styled-components";

import theme from "@styles/theme";

const Headline = ({
  title = "",
  imgSrc = "",
  padding = "80px 0 32px",
  onClick = () => null,
  MORE = false,
  BORDER = false,
}: any) => {
  return (
    <Wrapper $padding={padding} $border={BORDER}>
      <Title>
        {title}
        {imgSrc && (
          <IconWrapper>
            <Image src={imgSrc} alt="title icon" fill />
          </IconWrapper>
        )}
      </Title>
      {MORE && <MoreButton onClick={onClick}>더보기+</MoreButton>}
    </Wrapper>
  );
};

export default Headline;

const Wrapper = styled.div<{ $padding?: string; $border?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $padding }) => ($padding ? $padding : "52px 0 20px")};

  ${theme.devices.desktop} {
    padding: ${({ $padding }) => ($padding ? $padding : "80px 0 32px")};

    ${({ $border }) =>
      $border &&
      css`
        border-bottom: ${theme.colors.blackColor} 1px solid;
      `}
  }
`;

const Title = styled.h2`
  ${theme.typography.largeTitle}
  display: flex;
  align-items: baseline;
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.emphasizedTitle}
  }
`;

const IconWrapper = styled.div`
  position: relative;
  margin-left: 8px;
  width: 20px;
  height: 20px;
  ${theme.devices.desktop} {
    width: 28px;
    height: 28px;
  }
`;

const MoreButton = styled.button`
  ${theme.typography.headline2}
  color:${theme.colors.lightGrayFontColor};
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline1}
  }
`;
