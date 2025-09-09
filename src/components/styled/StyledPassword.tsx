import React, {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  useState,
  memo,
} from "react";
import styled, { css } from "styled-components";
import theme from "@styles/theme";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

type StyledPasswordProps = {
  ICON?: boolean;
  width?: string;
  height?: number;
  margin?: string;
  border?: string;
  borderRadius?: number;
  bgColor?: string;
  name?: string;
  title?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
};

const StyledPassword = ({
  ICON = true,
  width,
  height = 50,
  margin,
  border = `1px solid ${theme.colors.lightGrayBorderColor}`,
  borderRadius = 0,
  bgColor = theme.colors.whiteColor,
  name,
  title,
  value,
  onFocus = () => null,
  onBlur = () => null,
  onChange,
  onKeyDown,
  maxLength = 200,
  disabled = false,
  placeholder,
}: StyledPasswordProps) => {
  const [visible, setVisible] = useState(false);
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

  return (
    <>
      {title && <Title>{title}</Title>}
      <Wrapper
        $width={width}
        $height={height}
        $margin={margin}
        $border={border}
        $bgColor={bgColor}
        $borderRadius={borderRadius}
        $isFocus={isFocus}
        $icon={ICON}
      >
        <Input
          name={name}
          value={value}
          type={visible ? "text" : "password"}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          $icon={ICON}
        />
        {ICON && (
          <ViewButton onClick={() => setVisible(!visible)}>
            {visible ? (
              <IoEyeOffSharp
                fontSize={18}
                color={theme.colors.lightGrayFontColor}
              />
            ) : (
              <IoEyeSharp
                fontSize={18}
                color={theme.colors.lightGrayFontColor}
              />
            )}
          </ViewButton>
        )}
      </Wrapper>
    </>
  );
};

export default memo(StyledPassword);
const Title = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Wrapper = styled.div<{
  $width?: string;
  $height?: number;
  $margin?: string;
  $border?: string;
  $bgColor?: string;
  $borderRadius?: number;
  $isFocus?: boolean;
  $icon?: boolean;
}>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => $height}px;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  background-color: ${({ $bgColor }) => $bgColor};
  ${({ $isFocus }) =>
    $isFocus &&
    css`
      border: 1px solid ${theme.colors.blackColor};
    `};
  ${({ $icon }) =>
    $icon &&
    css`
      padding-right: 12px;
    `}
`;

const Input = styled.input<{ $icon?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 14px 12px;
  font-size: 15px;
  border-radius: 4px;
  background-color: inherit;
  ${({ $icon }) =>
    $icon &&
    css`
      width: 90%;
    `}
`;
const ViewButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
