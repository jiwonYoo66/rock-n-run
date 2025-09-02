"use client";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiCart } from "react-icons/bi";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

import { FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import StyledSelect from "@components/styled/StyledSelect";

const RecommendedProducts = () => {
  const { width } = useWindowSize();
  return (
    <Wrapper>
      <Headline
        title="추천 러닝용품"
        paddingMobile={"52px 16px 16px"}
        paddingPc={"60px 0 20px"}
        onClick={() => null}
        MORE
      />
      {/* mobile, tablet */}
      <MobileWrapper>
        <Swiper
          slidesPerView={width >= 720 ? 3 : 1}
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
        {[...Array(10)].map((data, index) => (
          <CardItem key={index} data={data} index={index} />
        ))}
      </CardContainer>
    </Wrapper>
  );
};

export default RecommendedProducts;

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
      <Description>
        <BrandName>ONRUNNING</BrandName>
        <ProductName>
          온 남성 클라우드 비스타 2 BLACK BLACK 온 남성 클라우드 비스타 2{" "}
        </ProductName>
        <FlexBox $justifyContent="space-between" $margin="12px 0 0">
          <Price>
            <Percent>56%</Percent> {(159000).toLocaleString()}원
          </Price>
          <AddToCart onClick={() => {}}>
            <BiCart size={22} />
          </AddToCart>
        </FlexBox>
      </Description>
    </Card>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

const MobileWrapper = styled.div`
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

const CardContainer = styled.div`
  display: none;
  ${theme.devices.desktop} {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border-bottom: ${theme.colors.blackColor} 1px solid;
  }
`;

const Card = styled.div`
  padding: 24px 24px 20px;
  min-width: calc(100% - 32px);
  ${theme.devices.tablet} {
    min-width: calc((100% - 32px) / 3);
  }
  ${theme.devices.desktop} {
    padding: 20px 16px;
    min-width: auto;
    width: calc(100% / 5);
    border-top: ${theme.colors.blackColor} 1px solid;
    border-bottom: none;
    border-left: none;
    border-right: ${theme.colors.blackColor} 1px solid;
    &:nth-of-type(5n) {
      border-right: none;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
`;

const Description = styled.div`
  padding: 12px;
`;

const BrandName = styled.h4`
  ${theme.typography.headline2}
  margin: 0 0 8px;
  font-family: PretendardBold, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const ProductName = styled.h3`
  ${theme.typography.headline2}
  display: -webkit-box;
  min-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 2줄 넘어가면 말줄임 */
  -webkit-box-orient: vertical;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const Price = styled.div`
  ${theme.typography.headline2}
  font-family: PretendardBold, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const Percent = styled.span`
  color: ${theme.colors.activeLightRed};
`;

const AddToCart = styled.button`
  width: 22px;
  height: 22px;
`;
