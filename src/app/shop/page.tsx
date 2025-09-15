"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi";

import useCustomSearchParams from "@hooks/useCustomSearchParams";
import usePagination from "@hooks/usePagination";
import { paths } from "@lib/paths";
import theme from "@styles/theme";

import { Wrapper, FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import NewsCard from "@components/feature/news/NewsCard";
import Pagination from "@components/layout/pagination/Pagination";
import FilterButtons from "@components/layout/filterButton/FilterButtons";

const Shop = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const page = Number(searchParams.page) || 1;
  // 페이지네이션 관련 상태
  const [take, setTake] = useState(5);
  const [preCursor, setPreCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [cursorOption, setCursorOption] = useState<boolean | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const totalLength = 10;
  // useEffect(() => {
  //     if (state?.pageInfo) {
  //         const { preCursor, nextCursor } = state?.pageInfo;
  //         setPreCursor(preCursor);
  //         setNextCursor(nextCursor);
  //     }
  // }, [state?.pageInfo]);

  const handleMoveToDetail = (id: number) => {
    router.push(`/${paths.PROGRAM}/${id}`);
    // navigate(`/faq/${id}`, {
    //     state: {
    //         pathname,
    //         pageInfo: {
    //             page,
    //             preCursor,
    //             nextCursor
    //         }
    //     }
    // });
  };
  // 페이지네이션
  const {
    pageIndex,
    setPageIndex,
    pageGroupLength,
    prevPageHandler,
    nextPageHandler,
    prevPageGroupHandler,
    nextPageGroupHandler,
    resetPaginationHandler,
    disabled,
  } = usePagination({
    take,
    totalLength,
    setPreCursor,
    setNextCursor,
    setCursorOption,
    lists: [], // TODO: 임시
    id: "id", // TODO: 임시
  });

  return (
    <Wrapper>
      <Headline title="락앤런 스토어" />
      <FilterButtons
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        options={[
          { title: "전체", value: 0 },
          { title: "신발", value: 1 },
          { title: "의류", value: 2 },
          { title: "기타", value: 3 },
        ]}
      />
      <TotalLength>{(1124).toLocaleString()}개</TotalLength>
      <CardContainer>
        {[...Array(10)].map((data, index) => (
          <CardItem key={index} data={data} index={index} />
        ))}
      </CardContainer>
      <Pagination
        take={take}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageGroupLength={pageGroupLength}
        totalLength={totalLength}
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
        prevPageGroupHandler={prevPageGroupHandler}
        nextPageGroupHandler={nextPageGroupHandler}
        resetPaginationHandler={resetPaginationHandler}
        disabled={disabled}
        BORDER
      />
    </Wrapper>
  );
};

export default Shop;

const CardItem = ({ data, index }: any) => {
  return (
    <Card key={index}>
      <ImageWrapper>
        <Image src="/assets/dummy/product_shoe.svg" alt="이벤트 이미지" fill />
      </ImageWrapper>
      <Description>
        <BrandName>ONRUNNING</BrandName>
        <ProductName>온 남성 클라우드 비스타 2 BLACK BLACK</ProductName>
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

const TotalLength = styled.div`
  ${theme.typography.headline2}
  margin: 32px 0;
  font-family: PretendardSemiBold, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline1}
  }
`;

const CardContainer = styled.div`
  margin: 0 0 60px;
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
  border-top: ${theme.colors.blackColor} 1px solid;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 360px;
  aspect-ratio: 295/360;
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
