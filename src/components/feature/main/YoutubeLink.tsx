"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

import { FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";

const YoutubeLink = () => {
  const { width } = useWindowSize();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (!prevRef.current || !nextRef.current) return;

    swiperRef.current.params.navigation.prevEl = prevRef.current;
    swiperRef.current.params.navigation.nextEl = nextRef.current;

    // 새로 네비게이션 다시 초기화
    swiperRef.current.navigation.destroy();
    swiperRef.current.navigation.init();
    swiperRef.current.navigation.update();
  }, [swiperRef.current, prevRef.current, nextRef.current]);

  return (
    <Wrapper>
      <Headline
        title="장수TV"
        padding={width < 1080 ? "52px 0 16px" : "60px 0 32px"}
        onClick={() => null}
        MORE
      />
      <LinkWrapper>
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper"
        >
          {[...Array(3)].map((data, index) => (
            <SwiperSlide key={index}>
              <ImageWrapper>
                <Image
                  src="/assets/images/noImageArticle.png"
                  alt="이벤트 이미지"
                  objectFit="cover"
                  fill
                />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
        <FlexBox $justifyContent="space-between" $margin="12px 0 0">
          <LinkTitle>장수트레일레이스 한국의 샤모니를 달리다</LinkTitle>
          <ButtonWrapper className="swiper-navigation">
            <Button className="swiper_prev" ref={prevRef}>
              <MdKeyboardArrowLeft size={20} />
            </Button>
            <Button className="swiper_next" ref={nextRef}>
              <MdKeyboardArrowRight size={20} />
            </Button>
          </ButtonWrapper>
        </FlexBox>
      </LinkWrapper>
    </Wrapper>
  );
};

export default dynamic(() => Promise.resolve(YoutubeLink), { ssr: false });

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;
  ${theme.devices.desktop} {
    padding: 0;
    width: calc((100% - 308px) / 8 * 3 + 88px);
  }
`;

const LinkWrapper = styled.div`
  padding: 24px;
  width: 100%;
  /* height: 395px; */
  border: ${theme.colors.blackColor} 1px solid;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  ${theme.devices.desktop} {
    height: 304px;
  }
`;

const LinkTitle = styled.div`
  width: calc(100% - 68px);
  font-family: PretendardMedium, sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
