"use client";
import { Fragment, Dispatch, SetStateAction } from "react";
// import { useSearchParams } from 'react-router-dom';
import styled, { css } from "styled-components";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { darken } from "polished";

import theme from "@styles/theme";
import useCustomSearchParams from "@hooks/useCustomSearchParams";

type PaginationProps = {
  BORDER?: boolean;
  pageGroupLength: number;
  pageIndex: number;
  take: number;
  totalLength: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  prevPageGroupHandler: () => void;
  nextPageGroupHandler: () => void;
  resetPaginationHandler: () => void;
  disabled: Record<string, boolean>;
  margin?: string;
  padding?: string;
};

const Pagination = ({
  BORDER = false,
  pageGroupLength,
  pageIndex,
  take,
  totalLength,
  setPageIndex,
  prevPageHandler,
  nextPageHandler,
  prevPageGroupHandler,
  nextPageGroupHandler,
  resetPaginationHandler,
  disabled,
  margin = "12px 0 0",
  padding = "20px 0 0",
}: PaginationProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Wrapper $margin={margin} $padding={padding} $border={BORDER}>
      {/* 이동 버튼 영역 */}
      <Container $gap={4}>
        <Button onClick={prevPageHandler} disabled={disabled.prevPage}>
          <HiChevronLeft size={20} />
        </Button>
        <ListContainer>
          {[...Array(10)].map((_, i) => (
            <Fragment key={pageGroupLength / take + 1 + i}>
              {pageGroupLength / take + 1 + i <=
                Math.ceil(totalLength / take) && (
                <List
                  onClick={() => {
                    setPageIndex(i * take);
                    setSearchParams({
                      page: String(pageGroupLength / take + 1 + i),
                    });
                  }}
                  $active={i === pageIndex / take}
                >
                  {pageGroupLength / take + 1 + i}
                </List>
              )}
            </Fragment>
          ))}
        </ListContainer>
        <Button onClick={nextPageHandler} disabled={disabled.nextPage}>
          <HiChevronRight size={20} />
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div<{
  $margin?: string;
  $padding?: string;
  $border?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding}; */
  padding: 20px 0 140px;
  width: 100%;

  ${({ $border }) =>
    $border &&
    css`
      border-top: ${theme.colors.blackColor} 1px solid;
    `}
`;
const Container = styled.div<{ $gap?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  font-family: PretendardRegular, sans-serif;

  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap}px;
    `}
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  &:hover {
    color: ${theme.colors.deepGrayFontColor};
  }
  &:active {
    color: ${theme.colors.deepGrayFontColor};
  }
  &:disabled {
    color: ${theme.colors.paginationColor};
    cursor: auto;
  }
`;
const ListContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
`;
const List = styled.li<{ $active?: boolean }>`
  width: 100%;
  color: ${theme.colors.paginationColor};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    color: ${({ $active }) =>
      !$active
        ? darken(0.3, theme.colors.paginationColor)
        : theme.colors.blackColor};
  }
  ${({ $active }) =>
    $active &&
    css`
      color: ${theme.colors.blackColor};
    `}
`;
