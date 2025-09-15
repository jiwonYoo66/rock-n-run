import React, { memo } from "react";
import styled, { css } from "styled-components";
import { DataValueType } from "@utils/types";
import theme from "@styles/theme";

type FontType = {
  $fontSize?: number;
  $fontColor?: string;
  $margin?: string;
};

type StyledSelectType = {
  REQUIRED?: boolean;
  HIDDEN?: boolean;
  DATA_VALUE?: boolean;
  COLUMN?: boolean;
  width?: number;
  height?: number;
  margin?: string;
  title?: string;
  description?: string;
  name?: string;
  value: string | number;
  options: string[] | number[] | DataValueType[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string | number;
  fontFamily?: string;
  fontColor?: string;
  fontSize?: number;
  disabled?: boolean;
};

const StyledSelect = ({
  REQUIRED,
  HIDDEN,
  DATA_VALUE,
  COLUMN,
  width,
  height,
  margin,
  title,
  description,
  value,
  name,
  options = [],
  onChange = () => null,
  placeholder,
  fontFamily = "PretendardRegular",
  fontColor = theme.colors.blackColor,
  fontSize = 15,
  disabled,
}: StyledSelectType) => {
  if (COLUMN) {
    return (
      <Wrapper $column={COLUMN} $margin={margin}>
        {title && (
          <ColumnTitle>
            {title}
            {REQUIRED && <Asterisk> *</Asterisk>}
          </ColumnTitle>
        )}

        <Select
          $column={COLUMN}
          $width={width}
          $height={height}
          $fontColor={
            placeholder === value ? theme.colors.deepGrayFontColor : fontColor
          }
          $fontFamily={fontFamily}
          $fontSize={fontSize}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
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
                  disabled={!!placeholder && index === 0}
                >
                  {option.title}
                </option>
              )
            )}
        </Select>
        {description && (
          <DescriptionBox>
            <Description $fontSize={fontSize}>{description}</Description>
          </DescriptionBox>
        )}
      </Wrapper>
    );
  }

  return (
    <Wrapper $margin={margin} $hidden={HIDDEN}>
      {title && <RowTitle>{title} : </RowTitle>}
      <Select
        $width={width}
        $fontColor={
          placeholder === value ? theme.colors.deepGrayFontColor : fontColor
        }
        $fontFamily={fontFamily}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
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
  $column?: boolean;
  $hidden?: boolean;
  $margin?: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};

  ${({ $column }) =>
    $column &&
    css`
      display: block;
    `};

  ${({ $hidden }) =>
    $hidden &&
    css`
      position: absolute;
      top: 0;
      height: 100%;
      opacity: 0;
      cursor: pointer;

      select {
        height: 100%;
      }
    `};
`;

const RegularFont = styled.div<FontType>`
  font-family: PretendardRegular, sans-serif;
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 16)}px;
  color: ${({ $fontColor, theme }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;

const RowTitle = styled(RegularFont)`
  margin-right: 12px;
  font-size: 14px;
  color: ${theme.colors.deepGrayFontColor};
`;
const ColumnTitle = styled(RegularFont)`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Asterisk = styled.span`
  color: ${theme.colors.activeOrange};
`;

const Select = styled.select<{
  $column?: boolean;
  $width?: number;
  $height?: number;
  $fontColor?: string;
  $fontFamily?: string;
  $fontSize?: number;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  min-width: 80px;
  font-family: ${({ $fontFamily }) => $fontFamily}, sans-serif;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  background-image: url("/assets/icons/icon_selectArrowDown.svg");
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: top 50% right 0;
  background-color: inherit;

  ${({ $column, $height, $fontSize }) =>
    $column &&
    css`
      padding: 0 12px;
      height: ${$height ? `${$height}px` : "50px"};
      font-size: ${$fontSize}px;
      /* font-size: 15px; */
      /* border-radius: 4px; */
      border: 1px solid ${theme.colors.lightGrayBorderColor};
      background-position: top 50% right 12px;
      background-image: url("/assets/icons/icon_selectArrow.svg");
      background-size: 24px;
    `};

  &:disabled {
    ${({ $column }) =>
      $column &&
      css`
        background-color: ${theme.colors.ultraLightGrayBgColor};
      `};
  }
`;
const DescriptionBox = styled.div``;

const Description = styled(RegularFont)<{
  $margin?: string;
  $width?: string;
  $fontColor?: string;
  $fontSize?: number;
}>`
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 12)}px;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.deepGrayFontColor};
  margin: ${({ $margin }) => ($margin ? $margin : "8px 0 0")};
  max-width: ${({ $width }) => ($width ? $width : "auto")};
  white-space: normal;
  word-break: keep-all;
`;
