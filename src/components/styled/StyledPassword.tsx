import React, { ChangeEvent, KeyboardEvent, useState, memo } from "react";
import styled from "styled-components";
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
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
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
  value,
  onChange,
  onKeyDown,
  maxLength = 200,
  disabled = false,
  placeholder,
}: StyledPasswordProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Wrapper
      $width={width}
      $height={height}
      $margin={margin}
      $border={border}
      $bgColor={bgColor}
      $borderRadius={borderRadius}
    >
      <Input
        name={name}
        value={value}
        type={visible ? "text" : "password"}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
      />
      {ICON && (
        <ViewButton onClick={() => setVisible(!visible)}>
          {visible ? (
            <IoEyeOffSharp
              fontSize={18}
              color={theme.colors.lightGrayFontColor}
            />
          ) : (
            <IoEyeSharp fontSize={18} color={theme.colors.lightGrayFontColor} />
          )}
        </ViewButton>
      )}
    </Wrapper>
  );
};

export default memo(StyledPassword);

const Wrapper = styled.div<{
  $width?: string;
  $height?: number;
  $margin?: string;
  $border?: string;
  $bgColor?: string;
  $borderRadius?: number;
}>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: ${({ $height }) => $height}px;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  display: flex;
  align-items: center;
  padding-right: 12px;
  justify-content: space-between;
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  background-color: ${({ $bgColor }) => $bgColor};
`;
const Input = styled.input`
  width: 90%;
  height: 100%;
  padding: 14px 12px;
  font-size: 15px;
  border-radius: 4px;
  background-color: inherit;
`;
const ViewButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
