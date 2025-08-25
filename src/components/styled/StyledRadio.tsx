import React, { ChangeEvent, memo } from "react";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

type StyledRadioProps = {
  fontSize?: number;
  fontColor?: string;
  margin?: string;
  radioId: string;
  label?: string;
  type?: string;
  name?: string;
  value?: any;
  checked?: any;
  dataValue?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const StyledRadio = ({
  fontSize,
  fontColor,
  margin,
  radioId,
  label,
  type = "radio",
  name,
  value,
  checked,
  onChange,
  dataValue = "",
  disabled,
}: StyledRadioProps) => {
  return (
    <Wrapper $margin={margin}>
      <Label htmlFor={radioId} $disabled={disabled}>
        <Marker $checked={value === checked} />
        <Input
          id={radioId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          data-value={dataValue}
          disabled={disabled}
        />
        {label && (
          <Text $fontSize={fontSize} $fontColor={fontColor}>
            {label}
          </Text>
        )}
      </Label>
    </Wrapper>
  );
};

export default memo(StyledRadio);

const Wrapper = styled.div<{ $margin?: string }>`
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
const Label = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: initial;
    `};
`;
const Marker = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${theme.colors.grayBorderColor};
  background-color: ${theme.colors.ultraLightGrayBgColor};
  transition: border-color 0.35s;

  ${({ $checked }) =>
    $checked &&
    css`
      /* border: 5px solid ${theme.colors.blackColor}; */
      border: 5px solid ${theme.colors.positiveBlue};
      background-color: ${theme.colors.whiteColor};
    `};
`;
const Input = styled.input`
  display: none;
`;
const Text = styled.div<{ $fontSize?: number; $fontColor?: string }>`
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 14)}px;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};
  margin-left: 12px;
`;
