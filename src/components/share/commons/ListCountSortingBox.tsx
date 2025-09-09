import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { DataValueType } from "@utils/types";
import theme from "@styles/theme";
import StyledSelect from "@components/styled/StyledSelect2";

type ListCountSortingBoxProps = {
  count: number;
  sort: number;
  handleSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  options?: DataValueType[];
};

const ListCountSortingBox = ({
  count = 12,
  sort,
  handleSort,
  options = [
    { value: 1, title: "최신순" },
    { value: 2, title: "오래된순" },
  ],
}: ListCountSortingBoxProps) => {
  return (
    <SortBox>
      <Count>총 {count}건</Count>
      <StyledSelect
        DATA_VALUE
        width={80}
        height={22}
        padding="0"
        border="none"
        value={sort}
        onChange={handleSort}
        options={options}
      />
    </SortBox>
  );
};

export default ListCountSortingBox;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Count = styled.span`
  font-family: PretendardMedium, sans-serif;
`;
