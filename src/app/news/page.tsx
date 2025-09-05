"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import useCustomSearchParams from "@hooks/useCustomSearchParams";
import usePagination from "@hooks/usePagination";
import { paths } from "@lib/paths";

import {
    Wrapper,
    CardContainer,
} from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import NewsCard from "@components/feature/news/NewsCard";
import Pagination from "@components/layout/pagination/Pagination";

const News = () => {
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

    return (
        <Wrapper>
            <Headline title="장수 뉴스" />
            <CardContainer>
                {[...Array(8)].map((data, index) => (
                    <NewsCard key={index} />
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
            />
        </Wrapper>
    );
};

export default News;
