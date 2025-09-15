import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { lighten } from "polished";

import theme from "@styles/theme";
import { DataValueType } from "@utils/types";

import { FlexBox } from "@components/share/commons/commons.style";

type FilterButtonsProps = {
  setSelectedFilter: Dispatch<SetStateAction<number>>;
  selectedFilter: number;
  options: DataValueType[];
  margin?: string;
  gap?: number;
};
const FilterButtons = ({
  selectedFilter,
  setSelectedFilter,
  options,
  margin = "0 0 32px",
  gap = 12,
}: FilterButtonsProps) => {
  return (
    <Wrapper $gap={gap} $margin={margin}>
      {options.map((option, index) => (
        <InputWrapper key={`${index}-${option.title}`}>
          <Input
            type="radio"
            id={`${index}filter`}
            name="filter"
            value={option.value}
            onChange={(e) => setSelectedFilter(+e.target.value)}
            checked={option.value === selectedFilter}
          />
          <Label htmlFor={`${index}filter`}>{option.title}</Label>
        </InputWrapper>
      ))}
    </Wrapper>
  );
};

export default FilterButtons;

const Wrapper = styled.div<{ $gap?: number; $margin?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  padding: 24px 0;
  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
`;
const InputWrapper = styled.div``;

const Label = styled.label`
  ${theme.typography.headline2}
  padding: 4px 12px;
  color: ${theme.colors.blackColor};
  background-color: ${theme.colors.whiteColor};
  border: ${theme.colors.blackColor} 1px solid;
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.whiteHoverColor};
  }
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
`;

const Input = styled.input`
  display: none;
  &:checked ~ label {
    color: ${theme.colors.whiteColor};
    background-color: ${theme.colors.blackColor};
    border: none;
    z-index: 10;
    &:hover {
      background-color: ${lighten(0.2, theme.colors.blackColor)};
    }
  }
`;
