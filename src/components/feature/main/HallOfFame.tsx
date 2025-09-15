"use client";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

import { FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import StyledSelect from "@components/styled/StyledSelect2";

const HallOfFame = () => {
  const { width } = useWindowSize();
  const [filter, setFilter] = useState(1);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter(+value);
  };

  return (
    <Wrapper>
      <Headline
        title="명예의 전당"
        imgSrc="./assets/icons/icon_trophy.svg"
        paddingMobile={"52px 16px 16px"}
        paddingPc={"60px 0 20px"}
        onClick={() => null}
        MORE
      />
      {/* mobile, tablet */}
      <MobileWrapper>
        <Swiper
          slidesPerView={width! >= 720 ? 2 : 1}
          // centeredSlides
          className="mySwiper"
          style={{ padding: "0 16px" }}
        >
          {[...Array(6)].map((data, index) => (
            <SwiperSlide key={index}>
              <CardItem data={data} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </MobileWrapper>
      {/* pc */}
      <PcWrapper>
        <StyledSelect
          value={filter}
          options={[{ title: "종합순위", value: 1 }]}
          onChange={onChange}
          width={84}
          height={22}
          padding="0"
          fontFamily="PretendardMedium"
          fontSize={18}
          margin="0 0 20px"
          DATA_VALUE
        />
        <CardContainer>
          {[...Array(6)].map((data, index) => (
            <CardItem key={index} data={data} index={index} />
          ))}
        </CardContainer>
      </PcWrapper>
    </Wrapper>
  );
};

export default HallOfFame;

const CardItem = ({ data, index }: any) => {
  return (
    <Card key={index}>
      <FlexBox $justifyContent="space-between" $margin="0 0 40px">
        <Flag
          $bgColor={
            index > 2 ? theme.colors.grayFontColor : theme.colors.blackColor
          }
        >
          <RankText>Rank</RankText>
          <Rank>{index + 1}</Rank>
          {/* <Rank>{(index % 3) + 1}</Rank> */}
        </Flag>
        <Record>
          <TimeLapse>01:12:45</TimeLapse>
          <Username>김영록</Username>
        </Record>
      </FlexBox>
      <FlexBox $flexDirection="column" $gap={20}>
        <FlexBox $justifyContent="space-between">
          <InfoText>배번</InfoText>
          <InfoText>1002</InfoText>
        </FlexBox>
        <FlexBox $justifyContent="space-between">
          <InfoText>이름</InfoText>
          <InfoText>김영록</InfoText>
        </FlexBox>
        <FlexBox $justifyContent="space-between">
          <InfoText>국적</InfoText>
          <InfoText>대한민국</InfoText>
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

const Wrapper = styled.section`
  width: 100%;
  ${theme.devices.desktop} {
    width: calc((100% - 308px) / 8 * 5 + 176px);
  }
`;

const MobileWrapper = styled.div`
  display: block;
  width: 100%;
  .swiper-slide {
    border-top: ${theme.colors.blackColor} 1px solid;
    border-bottom: ${theme.colors.blackColor} 1px solid;
    border-left: ${theme.colors.blackColor} 1px solid;

    &:last-of-type {
      border-right: ${theme.colors.blackColor} 1px solid;
    }
  }
  ${theme.devices.desktop} {
    display: none;
  }
`;

const PcWrapper = styled.div`
  display: none;
  ${theme.devices.desktop} {
    display: block;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: ${theme.colors.blackColor} 1px solid;
`;

const Card = styled.div`
  padding: 24px 24px 32px;
  min-width: calc(100% - 32px);
  ${theme.devices.tablet} {
    min-width: calc((100% - 32px) / 2);
  }
  ${theme.devices.desktop} {
    min-width: auto;
    width: calc(100% / 3);
    border-top: ${theme.colors.blackColor} 1px solid;
    border-bottom: none;
    border-left: none;
    border-right: ${theme.colors.blackColor} 1px solid;
    &:nth-of-type(3n) {
      border-right: none;
    }
  }
`;

const Flag = styled.div<{ $bgColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 50px;
  height: 67px;
  clip-path: polygon(100% 0, 100% 100%, 50% 80%, 0 100%, 0 0);
  background-color: ${({ $bgColor }) =>
    $bgColor ? $bgColor : theme.colors.blackColor};
`;

const RankText = styled.span`
  display: inline-block;
  margin-bottom: 4px;
  font-size: 15px;
  font-family: PretendardMedium, sans-serif;
  color: ${theme.colors.lightGrayFontColor};
`;

const Rank = styled.span`
  ${theme.typography.bodyDesktop}
  font-family: Tenada, sans-serif;
  color: ${theme.colors.whiteColor};
`;

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TimeLapse = styled.span`
  display: inline-block;
  margin-bottom: 6px;
  font-size: 24px;
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    font-size: 28px;
  }
`;

const Username = styled.span`
  ${theme.typography.bodyDesktop}
  font-family: PretendardMedium, sans-serif;
`;

const InfoText = styled.span`
  font-size: 15px;
  line-height: 18px;
  font-family: PretendardMedium, sans-serif;
`;
