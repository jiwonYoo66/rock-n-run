import React, {
  ForwardedRef,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

type StyledInputProps = {
  ROW?: boolean;
  ASTERISK?: boolean;
  BUTTON?: boolean;
  width?: string | number;
  height?: number;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: number;
  title?: string;
  subTitle?: string;
  warning?: string;
  description?: string;
  name?: string;
  value: string;
  type?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
};

const StyledInput = forwardRef(
  (
    {
      ROW,
      BUTTON,
      ASTERISK,
      width,
      height = 50,
      padding,
      margin,
      border,
      borderRadius = 0,
      title,
      subTitle,
      warning,
      description,
      name = "",
      value = "",
      type = "text",
      onFocus = () => null,
      onBlur = () => null,
      onChange = () => null,
      onKeyPress = () => null,
      maxLength = 200,
      disabled = false,
      placeholder = "",
    }: StyledInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    if (ROW) {
      return (
        <Wrapper $row={ROW} $margin={margin}>
          {title && (
            <RowTitle>
              {title}
              {ASTERISK && <Asterisk>*</Asterisk>}
            </RowTitle>
          )}
          <InputBox
            $isFocus={isFocus}
            $width={width}
            $height={height}
            $border={border}
          >
            <Input
              $padding={padding}
              ref={ref}
              name={name}
              value={value}
              type={type}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChange}
              onKeyPress={onKeyPress}
              maxLength={maxLength}
              disabled={disabled}
              placeholder={placeholder}
            />
          </InputBox>
        </Wrapper>
      );
    }

    return (
      <Wrapper $row={ROW} $isDescription={!!description} $margin={margin}>
        {title && (
          <ColumnTitle>
            {title}
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
            {ASTERISK && <Asterisk>*</Asterisk>}
          </ColumnTitle>
        )}
        <FlexBox>
          <InputBox
            $isFocus={isFocus}
            $width={width}
            $height={height}
            $border={border}
            $borderRadius={borderRadius}
          >
            <Input
              $padding={padding}
              ref={ref}
              name={name}
              value={value}
              type={type}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChange}
              onKeyPress={onKeyPress}
              maxLength={maxLength}
              disabled={disabled}
              placeholder={placeholder}
            />
          </InputBox>
          {warning && (
            <WarningBox $height={height}>
              <WarningText>{warning}</WarningText>
            </WarningBox>
          )}
          {description && (
            <DescriptionBox>
              <Description>{description}</Description>
            </DescriptionBox>
          )}
        </FlexBox>
      </Wrapper>
    );
  }
);

export default React.memo(StyledInput);

const Wrapper = styled.div<{
  $row?: boolean;
  $isDescription?: boolean;
  $width?: string | number;
  $margin?: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  font-family: PretendardRegular, sans-serif;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  position: relative;
  flex: 1;

  ${({ $row }) =>
    $row &&
    css`
      display: flex;
      align-items: center;
    `};

  ${({ $isDescription }) =>
    $isDescription &&
    css`
      padding-bottom: 22px;
    `};
`;
const ColumnTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const RowTitle = styled.div`
  width: 180px;
`;
const SubTitle = styled.span`
  color: ${theme.colors.lightGrayFontColor};
  margin-left: 4px;
`;
const Asterisk = styled.span`
  color: ${theme.colors.activeLightRed};
  margin-left: 2px;
`;
const InputBox = styled.div<{
  $width?: string | number;
  $height?: number;
  $border?: string;
  $borderRadius?: number;
  $isFocus?: boolean;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => $height}px;
  border: ${({ $border }) =>
    $border ? $border : `1px solid ${theme.colors.lightGrayBorderColor}`};
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  display: flex;
  align-items: center;

  ${({ $isFocus }) =>
    $isFocus &&
    css`
      border: 1px solid ${theme.colors.blackColor};
    `};
`;
const Input = styled.input<{ $padding?: string }>`
  width: 100%;
  height: 100%;
  padding: ${({ $padding }) => ($padding ? $padding : "14px 12px")};
  border-radius: 4px;
`;
const WarningBox = styled.div<{ $height?: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  margin-left: 30px;
`;
const WarningText = styled.div`
  font-size: 14px;
  color: ${theme.colors.activeRed};
`;
const DescriptionBox = styled.div`
  margin-left: 30px;
`;
const FlexBox = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
const Description = styled.div<{ $margin?: string }>`
  font-size: 14px;
  color: ${theme.colors.deepGrayFontColor};
  margin: ${({ $margin }) => ($margin ? $margin : "4px 0")};
`;
