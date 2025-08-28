"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

import { StatusBadge } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";

const NoticeFaq = () => {
  const { width } = useWindowSize();
  const [selectedTab, setSelectedTab] = useState("공지사항");
  return (
    <Wrapper>
      <Headline
        padding={width < 1080 ? "52px 0 16px" : "60px 0 32px"}
        onClick={() => null}
        options={["공지사항", "자주묻는질문"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        MORE
        TAB
      />
      <ListWrapper>
        {[...Array(5)].slice(0, 5).map((data, index) => (
          <ListItem key={index}>
            <TitleWrapper>
              <StatusBadge
                $margin="0 16px 0 0"
                $status={index % 2 === 0 ? 2 : 1}
              >
                {index % 2 === 0 ? "N" : "A"}
              </StatusBadge>
              <Title>
                제 6회 2025 장수 트레일 레이스 보급품 부족에 대한 사과의 말씀 제
                6회 2025 장수 트레일 레이스 보급품 부족에 대한 사과의 말씀
              </Title>
            </TitleWrapper>
            <Date>{dayjs("2025-09-11").format("YYYY.MM.DD")}</Date>
          </ListItem>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default dynamic(() => Promise.resolve(NoticeFaq), { ssr: false });

const Wrapper = styled.section`
  padding: 0 16px;
  width: 100%;
  ${theme.devices.desktop} {
    padding: 0;
    width: calc((100% - 308px) / 8 * 5 + 176px);
  }
`;

const ListWrapper = styled.ul`
  width: 100%;
  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: ${theme.colors.lightGrayBorderColor} 1px solid;
  &:last-of-type {
    border-bottom: none;
  }
  ${theme.devices.desktop} {
    gap: 20px;
    height: 78px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 90px);
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
    width: calc(100% - 138px);
  }
`;

const Title = styled.p`
  ${theme.typography.headline2}
  width: calc(100% - 38px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const Date = styled.span`
  ${theme.typography.bodyMobile}
  display: inline-block;
  width: 90px;
  text-align: right;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
    width: 118px;
  }
`;
