import React from "react";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

type StyledInputProps = {
  COLUMN?: boolean;
  MAX_LENGTH?: boolean;
  width?: number;
  height?: number;
  margin?: string;
  border?: string;
  title?: string;
  subTitle?: string;
  optionalText?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
};

const StyledTextarea = ({
  COLUMN,
  MAX_LENGTH,
  width,
  height = 100,
  margin,
  border = `1px solid ${theme.colors.lightGrayBorderColor}`,
  title = "",
  subTitle,
  optionalText = "",
  name = "",
  value = "",
  onChange = () => null,
  onKeyDown = () => null,
  maxLength = 200,
  disabled = false,
  placeholder = "",
}: StyledInputProps) => {
  if (COLUMN) {
    return (
      <Wrapper $column={COLUMN} $width={width} $margin={margin}>
        {title && (
          <FlexBox>
            <ColumnTitle>
              {title}
              {subTitle && <GrayText>{subTitle}</GrayText>}
            </ColumnTitle>
            {MAX_LENGTH && (
              <GrayText>
                ({value.length || 0}/{maxLength})
              </GrayText>
            )}
          </FlexBox>
        )}
        <Textarea
          $height={height}
          $border={border}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper $margin={margin}>
      {title && (
        <RowTitle>
          {title}
          {optionalText && <GrayText>{optionalText}</GrayText>}
        </RowTitle>
      )}
      <Textarea
        $width={width}
        $height={height}
        $border={border}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default React.memo(StyledTextarea);

const Wrapper = styled.div<{
  $column?: boolean;
  $width?: number;
  $margin?: string;
}>`
  display: flex;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};

  ${({ $column }) =>
    $column &&
    css`
      display: block;
    `};
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const ColumnTitle = styled.div`
  font-size: 14px;
  color: ${theme.colors.blackColor};
`;
const RowTitle = styled.div`
  font-family: PretendardSemiBold, sans-serif;
  font-size: 16px;
  width: 180px;
  color: ${theme.colors.blackColor};
`;
const GrayText = styled.span`
  display: inline-block;
  margin-left: 4px;
  font-size: 14px;
  font-family: PretendardRegular, sans-serif;
  color: ${theme.colors.lightGrayFontColor};
`;
const Textarea = styled.textarea<{
  $width?: number;
  $height?: number;
  $border?: string;
  $isFocus?: boolean;
}>`
  padding: 14px 12px;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => $height}px;
  font-size: 15px;
  border: ${({ $border }) => $border};
  border-radius: 4px;
  white-space: pre-wrap;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    border: 1px solid ${theme.colors.blackColor};
  }
`;
