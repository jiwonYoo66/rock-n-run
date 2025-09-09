import { ChangeEvent, memo } from "react";
import styled, { css } from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";

import theme from "@styles/theme";

import { FlexBox } from "@components/share/commons/commons.style";

type StyledPolicyCheckboxProps = {
  OPTIONS?: boolean;
  label?: string;
  subLabel?: string;
  margin?: string;
  width?: string;
  fontColor?: string;
  checkboxId: string;
  value: any;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

const StyledPolicyCheckbox = ({
  OPTIONS = false,
  label,
  subLabel,
  margin,
  width,
  fontColor,
  checkboxId,
  value,
  name = "checkbox",
  checked,
  onChange = () => null,
  onClick = () => null,
}: StyledPolicyCheckboxProps) => {
  if (OPTIONS) {
    return (
      <Wrapper $margin={margin} $width={width}>
        <Box>
          <FlexBox $justifyContent="space-between">
            <Input
              id={checkboxId}
              type="checkbox"
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
            />

            <Label
              htmlFor={checkboxId}
              $checked={checked}
              $fontColor={fontColor}
              $options={OPTIONS}
            >
              {label}
              {subLabel && <SubLabel>{subLabel}</SubLabel>}
            </Label>

            <Button onClick={onClick}>
              <Arrow size={12} $checked={checked} />
            </Button>
          </FlexBox>
        </Box>
      </Wrapper>
    );
  }
  return (
    <Wrapper $margin={margin} $width={width}>
      <Box>
        <Input
          id={checkboxId}
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <Label htmlFor={checkboxId} $checked={checked} $fontColor={fontColor}>
          {label}
          {subLabel && <SubLabel>{subLabel}</SubLabel>}
        </Label>
      </Box>
    </Wrapper>
  );
};

export default memo(StyledPolicyCheckbox);

const Wrapper = styled.div<{ $margin?: string; $width?: string }>`
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  width: ${({ $width }) => ($width ? $width : "auto")};
`;
const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 22px;
`;
const Label = styled.label<{
  $margin?: string;
  $checked?: boolean;
  $fontColor?: string;
  $options?: boolean;
}>`
  display: inline-block;
  font-family: PretendardMedium, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 7px;
    left: -19px;
    display: inline-block;
    width: 7px;
    height: 3px;
    vertical-align: top;
    border-bottom-style: solid;
    border-left-style: solid;
    border-color: ${theme.colors.whiteColor};
    border-width: 2px;
    -webkit-transition: -webkit-transform 0.4s
      cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    z-index: 1;
    cursor: pointer;
  }

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: -6px;
    display: inline-block;
    margin-left: -16px;
    width: 16.5px;
    height: 16.5px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;
    background-color: #ededed;
    cursor: pointer;
    transition: all 250ms ease;
  }

  ${({ $checked }) =>
    $checked &&
    css`
      &:after {
        border-color: ${theme.colors.positiveBlue};
        background-color: ${theme.colors.positiveBlue};
      }
    `}

  ${({ $options }) =>
    $options &&
    css`
      /* width: 100%; */
      margin-left: 4px;
      opacity: 0.4;
      &:before {
        top: 5px;
        width: 9px;
        height: 5px;
        border-color: ${theme.colors.blackColor};
      }
      &:after {
        background-color: ${theme.colors.whiteColor};
      }
    `}
        ${({ $options, $checked }) =>
    $options &&
    $checked &&
    css`
      opacity: 1;
    `}
`;
const SubLabel = styled.span`
  margin-left: 4px;
  color: ${theme.colors.subTitleColor};
`;
const Arrow = styled(MdArrowForwardIos)<{ $checked?: boolean }>`
  opacity: 0.4;
  ${({ $checked }) =>
    $checked &&
    css`
      opacity: 1;
    `}
`;
const Input = styled.input`
  display: none;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;
