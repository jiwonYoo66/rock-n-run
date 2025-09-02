import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
// import { useSearchParams } from 'react-router-dom';

import { getPageIndex, getPageGroup } from "@utils/commons";
import useCustomSearchParams from "./useCustomSearchParams";

type PaginationProps = {
  take: number;
  totalLength: number;
  setPreCursor: Dispatch<SetStateAction<number>>;
  setNextCursor: Dispatch<SetStateAction<number>>;
  setCursorOption: Dispatch<SetStateAction<boolean | null>>;
  lists: any[];
  id: string;
  modalCloseHandler?: () => void;
};

const usePagination = ({
  take,
  totalLength,
  setPreCursor,
  setNextCursor,
  setCursorOption,
  lists,
  id,
  modalCloseHandler,
}: PaginationProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.page);
  // 페이지 그룹 변화 시 게시물 수. 0, take * 10, take * 20 씩으로 증감시켜 사용
  const [pageGroupLength, setPageGroupLength] = useState(0);
  // 데이터 수를 10으로 나누 것. ex) 0, 10, 20..
  const [pageIndex, setPageIndex] = useState(0);
  // 버튼 disabled
  const [disabled, setDisabled] = useState({
    prevPage: false,
    nextPage: false,
    prevPageGroup: false,
    nextPageGroup: false,
  });

  // 페이지 불러오기
  useEffect(() => {
    if (!currentPage) return;
    const nextPageIndex = getPageIndex(currentPage, take);
    const nextPageGroup = getPageGroup(currentPage, take);
    if (pageIndex !== nextPageIndex || pageGroupLength !== nextPageGroup) {
      setPageIndex(nextPageIndex);
      setPageGroupLength(nextPageGroup);
    }
  }, [currentPage]);

  // 버튼 비활성화 처리
  useEffect(() => {
    // prevPage
    if (pageGroupLength === 0 && pageIndex === 0) {
      setDisabled((prev) => ({ ...prev, prevPage: true }));
    } else {
      setDisabled((prev) => ({ ...prev, prevPage: false }));
    }
    // nextPage
    if (totalLength <= pageGroupLength + pageIndex + take) {
      setDisabled((prev) => ({ ...prev, nextPage: true }));
    } else {
      setDisabled((prev) => ({ ...prev, nextPage: false }));
    }
    // prevPageGroup
    if (pageGroupLength === 0) {
      setDisabled((prev) => ({ ...prev, prevPageGroup: true }));
    } else {
      setDisabled((prev) => ({ ...prev, prevPageGroup: false }));
    }
    // nextPageGroup
    if (totalLength - take * 10 <= pageGroupLength) {
      setDisabled((prev) => ({ ...prev, nextPageGroup: true }));
    } else {
      setDisabled((prev) => ({ ...prev, nextPageGroup: false }));
    }
  }, [pageGroupLength, pageIndex, take, totalLength]);

  const calculatePage = (
    pageIndex: number,
    pageGroupLength: number,
    take: number
  ) => {
    return String((pageIndex + pageGroupLength + take) / take);
  };

  const prevPageHandler = useCallback(() => {
    if (pageIndex === 0) {
      //이전 페이지 그룹으로 넘어가야되는 경우
      setPreCursor(lists[0][`${id}`] || 0);
      setCursorOption(false);
      const nextIndex = take * 9;
      const nextPageGroup = pageGroupLength - take * 10;
      const nextPage = calculatePage(nextIndex, nextPageGroup, take);
      setPageIndex(nextIndex);
      setPageGroupLength(nextPageGroup);
      setSearchParams({
        page: nextPage,
      });
    } else {
      //이전 페이지
      const nextIndex = pageIndex - take;
      const nextPage = calculatePage(nextIndex, pageGroupLength, take);
      setPageIndex(nextIndex);
      setSearchParams({
        page: nextPage,
      });
    }
    modalCloseHandler?.();
  }, [id, take, lists, pageIndex, pageGroupLength]);

  const nextPageHandler = useCallback(() => {
    if (pageIndex === take * 9) {
      // 다음 페이지 그룹으로 넘어가야되는 경우
      setNextCursor(lists[lists.length - 1][`${id}`] || 0);
      setCursorOption(true);
      const nextIndex = 0;
      const nextPageGroup = pageGroupLength + take * 10;
      const nextPage = calculatePage(nextIndex, nextPageGroup, take);
      setPageIndex(nextIndex);
      setPageGroupLength(nextPageGroup);
      setSearchParams({
        page: nextPage,
      });
    } else {
      // 다음 페이지
      const nextIndex = pageIndex + take;
      const nextPage = calculatePage(nextIndex, pageGroupLength, take);
      setPageIndex(nextIndex);
      setSearchParams({
        page: nextPage,
      });
    }
    modalCloseHandler?.();
  }, [id, take, lists, pageIndex, pageGroupLength]);

  const prevPageGroupHandler = useCallback(() => {
    setPreCursor(lists[0][`${id}`] || 0);
    setCursorOption(false);
    const nextIndex = take * 9;
    const nextPageGroup = pageGroupLength - take * 10;
    const nextPage = calculatePage(nextIndex, nextPageGroup, take);
    setPageIndex(nextIndex);
    setPageGroupLength(nextPageGroup);
    setSearchParams({
      page: nextPage,
    });
    modalCloseHandler?.();
  }, [id, take, lists, pageGroupLength]);

  const nextPageGroupHandler = useCallback(() => {
    setNextCursor(lists[lists.length - 1][`${id}`] || 0);
    setCursorOption(true);
    const nextIndex = 0;
    const nextPageGroup = pageGroupLength + take * 10;
    const nextPage = calculatePage(nextIndex, nextPageGroup, take);
    setPageIndex(nextIndex);
    setPageGroupLength(nextPageGroup);
    setSearchParams({
      page: nextPage,
    });
  }, [id, take, lists, pageGroupLength]);

  const resetPaginationHandler = useCallback(() => {
    setPreCursor(0); // 페이지네이션 초기화
    setNextCursor(0);
    setCursorOption(null);
    setPageIndex(0);
    setPageGroupLength(0);
    setSearchParams({
      page: String(1),
    });
  }, []);

  return {
    pageIndex,
    setPageIndex,
    pageGroupLength,
    prevPageHandler,
    nextPageHandler,
    prevPageGroupHandler,
    nextPageGroupHandler,
    resetPaginationHandler,
    disabled,
  };
};

export default usePagination;
