"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";
import { dayNumToString } from "@utils/commons";
import { getReservationType } from "@lib/enum";
import { EVENTS_DATA } from "@lib/DUMMY";

const MainEvents = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const { width } = useWindowSize();

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, index: number) => {
      if (el) videoRefs.current[index] = el;
    },
    []
  );

  /** 초기화 (PC는 첫 번째 자동재생, Mobile은 모두 정지) */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (width >= 1080 && i === 0) {
        video.play().catch(() => {});
      } else {
        video.currentTime = 1;
        video.pause();
      }
    });
  }, [width]);

  /** Hover 시 해당 비디오만 play */
  const handleHover = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 1;
      }
    });
  };

  /** Hover 해제 시 해당 비디오 pause (단, 첫 번째는 계속 재생) */
  const handleLeave = (index: number) => {
    videoRefs.current[index]?.pause();
    videoRefs.current[index].currentTime = 1;
  };

  return (
    <>
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
              <EventCard data={data} index={index} setVideoRef={setVideoRef} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      {/* pc */}
      <Wrapper>
        {EVENTS_DATA.slice(0, 4).map((data, index) => (
          <List
            key={data?.id}
            $listLength={EVENTS_DATA.length >= 4 ? 4 : EVENTS_DATA.length}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            <EventCard data={data} index={index} setVideoRef={setVideoRef} />
          </List>
        ))}
      </Wrapper>
    </>
  );
};

export default MainEvents;

/** 공통 Event Card */
const EventCard = ({
  data,
  index,
  setVideoRef,
}: {
  data: (typeof EVENTS_DATA)[0];
  index: number;
  setVideoRef: (el: HTMLVideoElement | null, index: number) => void;
}) => {
  const startDate = dayjs(data?.startDate);
  const endDate = dayjs(data?.endDate);

  return (
    <LinkWrapper href={data?.url}>
      <VideoArea>
        <StatusBadge $status={data?.status}>
          {getReservationType(data?.status)}
        </StatusBadge>
        <Video
          ref={(el) => setVideoRef(el, index)}
          src={data?.vidSrc}
          preload="auto"
          muted
          loop
        />
      </VideoArea>
      <TextArea>
        <Description>{data?.description || "-"}</Description>
        <Title>{data?.title || "-"}</Title>
        <Description>
          <Text>
            {data?.endDate
              ? `${startDate.format("M.DD")}(${dayNumToString(
                  startDate.get("day")
                )}) ~ ${endDate.format("M.DD")}(${dayNumToString(
                  endDate.get("day")
                )})`
              : ""}
          </Text>
          <Text>{data?.location}</Text>
        </Description>
      </TextArea>
    </LinkWrapper>
  );
};

const Wrapper = styled.ul`
  display: none;
  ${theme.devices.desktop} {
    display: flex;
    width: 100%;
    height: 793px;
    border-bottom: ${theme.colors.blackColor} 1px solid;
    border-right: ${theme.colors.blackColor} 1px solid;
    border-left: ${theme.colors.blackColor} 1px solid;
  }
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 18px 16px 0;
  width: 100%;
  max-width: 1079px;
  height: 760px;
  font-family: PretendardRegular, sans-serif;
  ${theme.devices.desktop} {
    display: none;
  }
`;
const List = styled.li<{ $listLength?: number }>`
  flex: 1;
  width: ${({ $listLength }) => `calc(100% / ${$listLength})`};
  height: 100%;
  border-left: ${theme.colors.blackColor} 1px solid;
  &:first-child {
    border-left: none;
  }
`;

const LinkWrapper = styled(Link)`
  width: 100%;
  height: 100%;
`;

const VideoArea = styled.div`
  position: relative;
  width: 100%;
  height: 630px;
  overflow: hidden;
  border: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.desktop} {
    height: calc(100% - 136px);
    border: none;
  }
`;

const StatusBadge = styled.span<{ $status?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 8px 10px;
  font-family: PretendardBold, sans-serif;
  font-size: 13px;
  ${theme.devices.desktop} {
    font-size: 15px;
  }
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  height: 112px;
  overflow: hidden;
  ${theme.devices.desktop} {
    padding: 23.5px 10px;
    height: 136px;
  }
`;

const Description = styled.p`
  ${theme.typography.bodyMobile}
  gap: 12px;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${theme.devices.desktop} {
    font-size: 15px;
  }
`;

const Title = styled.h2`
  ${theme.typography.bodyDesktop}
  padding: 8px 0;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PretendardBold, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.largeTitle}
    padding: 12px 0;
  }
`;

const Text = styled.span`
  &:first-child {
    margin-right: 12px;
  }
`;
