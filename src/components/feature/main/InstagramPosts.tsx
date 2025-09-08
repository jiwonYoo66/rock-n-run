"use client";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import theme from "@styles/theme";
import { EVENTS_DATA } from "@lib/DUMMY";

import Headline from "@components/layout/headline/Headline";

const InstagramPosts = () => {
  return (
    <Wrapper>
      <Headline
        title="인스타그램"
        imgSrc="./assets/icons/icon_insta_line.svg"
        paddingMobile={"52px 16px 16px"}
        paddingPc={"60px 0 32px"}
        onClick={() => null}
        MORE
      />
      {/* mobile, tablet */}
      <Container>
        <Swiper
          slidesPerView={1}
          centeredSlides
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={EVENTS_DATA.length > 1}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {EVENTS_DATA.slice(0, 4).map((data, index) => (
            <SwiperSlide key={data?.id}>
              <EventCard data={data} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      {/* pc */}
      <PcWrapper>
        {EVENTS_DATA.slice(0, 4).map((data, index) => (
          <List
            key={data?.id}
            $listLength={EVENTS_DATA.length >= 4 ? 4 : EVENTS_DATA.length}
          >
            <EventCard data={data} index={index} />
          </List>
        ))}
      </PcWrapper>
    </Wrapper>
  );
};

export default InstagramPosts;

/** 공통 Event Card */
const EventCard = ({
  data,
  index,
}: {
  data: (typeof EVENTS_DATA)[0];
  index: number;
}) => {
  return (
    <>
      <ContentArea>
        <Image
          src="/assets/dummy/insta_post1.svg"
          alt="인스타그램 게시물"
          fill
        />
      </ContentArea>
      <Title>{data?.title || "-"}</Title>
    </>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 0 0 240px;
  ${theme.devices.desktop} {
    padding: 0 0 280px;
  }
`;

const PcWrapper = styled.ul`
  display: none;
  ${theme.devices.desktop} {
    display: grid;
    grid-template-columns: repeat(4, minmax(237px, 1fr));
    gap: 44px;
    width: 100%;
  }
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 18px 16px 0;
  width: 100%;
  max-width: 1079px;
  font-family: PretendardRegular, sans-serif;
  ${theme.devices.desktop} {
    display: none;
  }
`;
const List = styled.li<{ $listLength?: number }>`
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  position: relative;
  width: 100%;
  max-height: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 4/5;
  ${theme.devices.desktop} {
    max-height: 470px;
  }
`;

const Title = styled.h2`
  ${theme.typography.headline2}
  margin: 20px 0 0;
  padding: 0 20px;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;
