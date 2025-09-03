"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";

import * as P from "./program.style";
import useCustomSearchParams from "@hooks/useCustomSearchParams";
import usePagination from "@hooks/usePagination";
import { paths } from "@lib/paths";

import { Wrapper } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import Pagination from "@components/layout/pagination/Pagination";

const Program = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const page = Number(searchParams.page) || 1;
  // 페이지네이션 관련 상태
  const [take, setTake] = useState(5);
  const [preCursor, setPreCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [cursorOption, setCursorOption] = useState<boolean | null>(null);

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
  console.log(page);
  return (
    <Wrapper>
      <Headline title="정기 프로그램" />
      <P.Container>
        {[...Array(8)].map((data, index) => (
          <Card key={index} />
        ))}
      </P.Container>
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
      />
    </Wrapper>
  );
};

const Card = () => {
  return (
    <P.CardWrapper>
      <P.ImageWrapper>
        <Image
          src="/assets/dummy/tour_post1.png"
          alt="프로젝트 소개 이미지"
          fill
        />
        <P.StatusBadge $status={1}>사전 예약중</P.StatusBadge>
      </P.ImageWrapper>
      <P.Description>
        <P.Title>2025 장수 쿨밸리 트레일 레이스</P.Title>
        <P.Date>
          <BiCalendar size={20} /> 대회 시작 일시 2025. 09. 11(월) 14:00
        </P.Date>
      </P.Description>
    </P.CardWrapper>
  );
};

export default Program;
