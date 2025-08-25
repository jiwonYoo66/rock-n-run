import React, { ChangeEvent, memo } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import theme from "@styles/theme";

type StyledCheckboxProps = {
  NO_BORDER?: boolean;
  label?: string;
  link?: string;
  fontColor?: string;
  margin?: string;
  borderColor?: string;
  bgColor?: string;
  termType?: string;
  checkboxId?: string;
  value?: any;
  value2?: any;
  name?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const StyledCheckbox = ({
  NO_BORDER = false,
  label,
  link,
  fontColor = theme.colors.grayFontColor,
  borderColor = theme.colors.blackColor,
  bgColor = theme.colors.whiteColor,
  margin,
  termType = "join",
  checkboxId,
  value,
  value2,
  name = "checkbox",
  checked,
  onChange = () => null,
  disabled = false,
}: StyledCheckboxProps) => {
  if (NO_BORDER) {
    return (
      <Wrapper $margin={margin}>
        <Box>
          <Input
            id={checkboxId}
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            data-value={value2}
            disabled={disabled}
          />
          <Label
            $noBorder={NO_BORDER}
            $fontColor={fontColor}
            $borderColor={borderColor}
            $bgColor={bgColor}
            htmlFor={checkboxId}
            $checked={checked}
          >
            {label}&nbsp;
            {link && (
              <OpenLink href={`/${termType}/${link}`} target="_blank">
                자세히
              </OpenLink>
            )}
          </Label>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper $margin={margin}>
      <Box>
        <Input
          id={checkboxId}
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          data-value={value2}
          disabled={disabled}
        />
        <Label
          $fontColor={fontColor}
          $borderColor={borderColor}
          $bgColor={bgColor}
          htmlFor={checkboxId}
          $checked={checked}
        >
          {label}
        </Label>
      </Box>
    </Wrapper>
  );
};

export default memo(StyledCheckbox);

const Wrapper = styled.div<{ $margin?: string }>`
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
`;
const Box = styled.div`
  position: relative;
  margin-left: 26px;
`;
const Label = styled.label<{
  $noBorder?: boolean;
  $checked?: boolean;
  $fontSize?: number;
  $fontColor?: string;
  $margin?: string;
  $borderColor?: string;
  $bgColor?: string;
}>`
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 14)}px;
  font-family: PretendardRegular, sans-serif;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.grayFontColor};
  padding-top: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 4px;
  cursor: pointer;

  &:before {
    content: "";
    display: inline-block;
    top: 5px;
    left: -22px;
    vertical-align: top;
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
    width: 10px;
    height: 4px;
    border-top-style: none;
    border-right-style: none;
    border-width: 2px;
    position: absolute;
    cursor: pointer;
  }

  &:after {
    content: "";
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    margin-left: -20px;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
    left: -6px;
    top: -1px;
    box-sizing: border-box;
    border: 1px solid ${({ $borderColor }) => $borderColor};
    background-color: ${({ $bgColor }) => $bgColor};
  }

  ${({ $checked }) =>
    $checked &&
    css`
      &:before {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        border-bottom-style: solid;
        border-left-style: solid;
        border-color: ${theme.colors.whiteColor};
      }

      &:after {
        border-color: ${theme.colors.blackColor};
        background-color: ${theme.colors.blackColor};
      }
    `}

  ${({ $noBorder, $checked }) =>
    $noBorder &&
    css`
      &:before {
        border-bottom-style: solid;
        border-left-style: solid;
        border-color: ${theme.colors.grayBorderColor};
      }

      &:after {
        border: none;
      }

      ${$checked &&
      css`
        &:before {
          /* border-color: ${theme.colors.blackColor}; */
          border-color: ${theme.colors.positiveBlue};
        }

        &:after {
          background-color: ${theme.colors.whiteColor};
        }
      `};
    `};
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
`;
const OpenLink = styled(Link)`
  color: ${theme.colors.deepGrayFontColor};
  text-decoration: underline !important;
  text-underline-position: under;
`;
