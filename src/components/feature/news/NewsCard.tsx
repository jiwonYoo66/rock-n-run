"use client";
import Image from "next/image";
import styled, { css } from "styled-components";
import { BiCalendar } from "react-icons/bi";

import theme from "@styles/theme";

const NewsCard = ({ data }: any) => {
    return (
        <Card>
            <ImageWrapper>
                <Image
                    src="/assets/dummy/news_post1.svg"
                    alt="프로젝트 소개 이미지"
                    fill
                />
                {/* <StatusBadge $status={1}>사전 예약중</StatusBadge> */}
            </ImageWrapper>
            <Description>
                <Title>2025 장수 쿨밸리 트레일 레이스</Title>
                <Date>
                    <BiCalendar size={20} /> 대회 시작 일시 2025. 09. 11(월)
                    14:00
                </Date>
            </Description>
        </Card>
    );
};

export default NewsCard;

const Card = styled.li`
    width: 100%;
    /* ${theme.devices.tablet} {
    width: calc((100% - 44px) / 2);
  }
  ${theme.devices.desktop} {
    width: calc((100% - 132px) / 4);
  } */
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 343/430;
    /* border: ${theme.colors.blackColor} 1px solid; */
`;

const StatusBadge = styled.span<{ $status?: number }>`
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

const Description = styled.div`
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
const Title = styled.h3`
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
const Date = styled.div`
    ${theme.typography.headline2}
    display: flex;
    gap: 4px;
    ${theme.devices.desktop} {
        font-size: 15px;
    }
`;
