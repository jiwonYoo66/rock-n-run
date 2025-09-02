"use client";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiCalendar } from "react-icons/bi";

import theme from "@styles/theme";

import Headline from "@components/layout/headline/Headline";

const UpcomingEvents = () => {
  return (
    <Wrapper>
      <Headline
        title="오픈예정"
        paddingMobile={"52px 16px 16px"}
        paddingPc={"60px 0 32px"}
        onClick={() => null}
        MORE
      />

      {/* mobile, tablet */}
      <MobileWrapper>
        <Swiper
          slidesPerView={1.3}
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
      <CardContainer>
        {[...Array(2)].map((data, index) => (
          <CardItem key={index} data={data} index={index} />
        ))}
      </CardContainer>
    </Wrapper>
  );
};

export default UpcomingEvents;

const CardItem = ({ data, index }: any) => {
  return (
    <Card key={index}>
      <ImageWrapper>
        <Image
          src="/assets/images/noImageArticle.png"
          alt="이벤트 이미지"
          objectFit="cover"
          fill
        />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Tag>트레일레이스</Tag>
          <Description>
            계곡과 숲길을 달리며, 시원한 여름을 만끽하는 쿨밸리 트레일 레이스
          </Description>
          <Date>
            <BiCalendar size={18} /> 사전예약일 2025. 09. 11(월) 14:00
          </Date>
        </Info>
        <DDay>D-{29}</DDay>
      </InfoWrapper>
    </Card>
  );
};

const Wrapper = styled.section`
  width: 100%;
  ${theme.devices.desktop} {
    width: calc((100% - 308px) / 8 * 3 + 88px);
  }
`;

const MobileWrapper = styled.div`
  width: 100%;
  .swiper-slide {
    border-top: ${theme.colors.blackColor} 1px solid;
    border-bottom: ${theme.colors.blackColor} 1px solid;
    border-right: ${theme.colors.blackColor} 1px solid;

    &:last-of-type {
      border-right: none;
    }
  }
  ${theme.devices.desktop} {
    display: none;
  }
`;

const CardContainer = styled.div`
  display: none;
  ${theme.devices.desktop} {
    display: flex;
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 12px 24px;
  min-width: 250px;
  height: 487px;
  ${theme.devices.desktop} {
    flex-direction: row;
    justify-content: space-between;
    padding: 24px 0 24px;
    min-width: auto;
    width: 100%;
    height: 276px;
    &:last-of-type {
      border-top: ${theme.colors.blackColor} 1px solid;
    }
  }
`;
const ImageWrapper = styled.div`
  order: 1;
  position: relative;
  width: 164px;
  height: 249px;
  overflow: hidden;
  ${theme.devices.desktop} {
    order: 2;
    width: 150px;
    height: 228px;
  }
`;
const InfoWrapper = styled.div`
  flex: 1;
  order: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${theme.devices.desktop} {
    order: 1;
  }
`;
const Info = styled.div``;
const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-size: 15px;
  line-height: 18px;
  border: ${theme.colors.blackColor} 1px solid;
  background-color: ${theme.colors.pointYellow};
`;
const Description = styled.div`
  ${theme.typography.headline2}
  margin: 16px 0;
  font-family: PretendardMedium, sans-serif;
  white-space: pre-wrap;
  word-break: keep-all;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;
const Date = styled.div`
  ${theme.typography.bodyMobile}
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    font-size: 15px;
  }
`;

const DDay = styled.h3`
  ${theme.typography.largeTitle}
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.emphasizedTitle}
  }
`;
