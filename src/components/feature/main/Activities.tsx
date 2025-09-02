"use client";
import Image from "next/image";
import styled, { css } from "styled-components";

import theme from "@styles/theme";

const Activities = () => {
  return (
    <Wrapper>
      <List>
        <Tag $status={1}>사전 예약중</Tag>
        <Description>
          <Title>장수산멍: 1박 2일 웰니스 캠프</Title>
          <Price>{(30000).toLocaleString()}원</Price>
        </Description>
        <Image
          src="/assets/images/noImageArticle.png"
          alt="이벤트 이미지"
          objectFit="cover"
          fill
        />
      </List>
      <List>
        <Tag $status={2}>티켓 품절</Tag>
        <Description>
          <Title>장수산멍: 1박 2일 웰니스 캠프</Title>
          <Price>{(30000).toLocaleString()}원</Price>
        </Description>
        <Image
          src="/assets/images/noImageArticle.png"
          alt="이벤트 이미지"
          objectFit="cover"
          fill
        />
      </List>
      <List>
        <Tag $status={1}>사전 예약중</Tag>
        <Description>
          <Title>장수산멍: 1박 2일 웰니스 캠프</Title>
          <Price>{(30000).toLocaleString()}원</Price>
        </Description>
        <Image
          src="/assets/images/noImageArticle.png"
          alt="이벤트 이미지"
          objectFit="cover"
          fill
        />
      </List>
    </Wrapper>
  );
};

export default Activities;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  padding: 52px 16px 0;
  width: 100%;
  overflow: hidden;
  ${theme.devices.desktop} {
    gap: 0;
    padding: 60px 0 0;
  }
`;

const List = styled.div`
  position: relative;
  flex: 0 0 100%;
  aspect-ratio: 1;
  ${theme.devices.desktop} {
    flex: 0 0 calc(100% / 3);
  }
`;

const Tag = styled.span<{ $status?: number }>`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 8px 10px;
  font-size: 15px;
  line-height: 18px;
  font-family: PretendardBold, sans-serif;
  z-index: 10;
  ${({ $status }) =>
    $status === 1 &&
    css`
      background-color: ${theme.colors.pointYellow};
    `}
  ${({ $status }) =>
    $status === 2 &&
    css`
      background-color: ${theme.colors.ultraLightGrayBgColor};
    `}
`;

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 32px;
  width: 100%;
  font-family: PretendardSemiBold, sans-serif;
  color: ${theme.colors.whiteColor};
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 26px;
`;

const Price = styled.div`
  ${theme.typography.bodyDesktop}
`;
