/*
 todo onChange Select data-value
 const onChange = () => {
    // <option
    //     value={option.value}
    //     data-value={option.title}>
    //     {option.title}
    // </option>
    if ('selectedIndex' in e.target) {
        console.info('dataSet : ', e.target.options[e.target.selectedIndex].dataset.value);
    }
  }
*/
import React, { memo } from "react";
import styled, { css } from "styled-components";
import { DataValueType, TypographyType } from "@utils/types";
import theme from "@styles/theme";

type StyledSelectType = {
  DATA_VALUE?: boolean;
  width?: number;
  percent?: number;
  height?: number;
  flex?: number;
  typography?: TypographyType;
  fontColor?: string;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: number;
  title?: string;
  name?: string;
  value?: string | number;
  options: string[] | number[] | DataValueType[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string | number;
  disabled?: boolean;
};

const StyledSelect = ({
  DATA_VALUE,
  width,
  percent,
  height = 48,
  flex,
  typography,
  fontColor = theme.colors.blackColor,
  padding = "14px 12px",
  margin,
  border = `1px solid ${theme.colors.lightGrayBorderColor}`,
  borderRadius = 4,
  title,
  value,
  name,
  options = [],
  onChange = () => null,
  placeholder,
  disabled,
}: StyledSelectType) => {
  return (
    <Wrapper $percent={percent} $flex={flex} $margin={margin}>
      {title && <Title>{title}</Title>}
      <Select
        $width={width}
        $height={height}
        $fontColor={
          placeholder === value ? theme.colors.grayFontColor : fontColor
        }
        $typography={typography}
        $padding={padding}
        $border={border}
        $borderRadius={borderRadius}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {!DATA_VALUE &&
          (options as string[] | number[]).map(
            (option: string | number, index: number) => (
              <option
                key={`${index}-option`}
                value={option}
                disabled={!!placeholder && index === 0}
              >
                {option}
              </option>
            )
          )}
        {DATA_VALUE &&
          (options as DataValueType[]).map(
            (option: DataValueType, index: number) => (
              <option
                key={`${index}-option`}
                value={option.value}
                data-value={option.title}
                data-option={option.option}
                disabled={!!placeholder && index === 0}
              >
                {option.title}
              </option>
            )
          )}
      </Select>
    </Wrapper>
  );
};

export default memo(StyledSelect);

const Wrapper = styled.div<{
  $hidden?: boolean;
  $percent?: number;
  $flex?: number;
  $margin?: string;
}>`
  width: ${({ $percent }) => ($percent ? `${$percent}%` : "auto")};
  position: relative;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  flex: ${({ $flex }) => ($flex ? $flex : 0)};
`;
const Title = styled.div`
  font-size: 14px;
  font-family: PretendardMedium, sans-serif;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;
const Select = styled.select<{
  $width?: number;
  $height?: number;
  $typography?: TypographyType;
  $fontColor?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: number;
}>`
  min-width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
  ${({ $typography }) =>
    $typography ? $typography : theme.typography.bodyMobile};
  font-family: PretendardRegular, sans-serif;
  font-weight: 500;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  padding: ${({ $padding }) => ($padding ? $padding : 0)};
  border: ${({ $border }) => ($border ? $border : "none")};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : 0}px;
  background-image: url("/selectArrowDown.svg");
  background-size: 16px;
  background-repeat: no-repeat;
  background-color: inherit;
  background-position: top 50% right ${({ $border }) => ($border ? "12px" : 0)}; // border 가 있을 경우 12px 패딩효과

  /* &:focus {
    ${({ $border }) =>
    $border &&
    css`
      border: 1px solid ${theme.colors.blackColor};
    `};
  } */

  &:disabled {
    cursor: initial;
    background-color: ${theme.colors.disabledColor};
  }

  @media screen and (max-width: 320px) {
    padding-left: 8px;
    background-position: top 50% right ${({ $border }) => ($border ? "4px" : 0)}; // border 가 있을 경우 12px 패딩효과
  }
`;
