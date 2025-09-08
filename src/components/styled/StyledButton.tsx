import React, { ForwardedRef, forwardRef, memo } from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";
import theme from "@styles/theme";
import LoadingSpinner from "@components/share/commons/LoadingSpinner";

type StyledButtonProps = {
  loading?: boolean;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  fontColor?: string;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: number;
  bgColor?: string;
  cursor?: string;
  title?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type ButtonType = {
  $width?: number | string;
  $height?: number;
  $fontSize?: number;
  $fontFamily?: string;
  $fontWeight?: string;
  $fontColor?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: number;
  $margin?: string;
  $bgColor?: string;
  $cursor?: string;
};

const StyledButton = forwardRef(
  (
    {
      loading,
      width,
      height = 50,
      fontSize = 14,
      fontWeight,
      fontFamily = "PretendardMedium",
      fontColor = theme.colors.whiteColor,
      padding = "8px 0",
      margin = "0",
      border,
      borderRadius = 0,
      bgColor = theme.colors.blackColor,
      cursor = "pointer",
      title = "",
      disabled = false,
      onClick = () => null,
    }: StyledButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        type="button"
        $width={width}
        $height={height}
        $fontSize={fontSize}
        $fontWeight={fontWeight}
        $fontFamily={fontFamily}
        $fontColor={fontColor}
        $padding={padding}
        $margin={margin}
        $border={border}
        $borderRadius={borderRadius}
        $bgColor={bgColor}
        $cursor={cursor}
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? <LoadingSpinner BUTTON /> : title}
      </Button>
    );
  }
);

export default memo(StyledButton);

const Button = styled.button<ButtonType>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => $height}px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-family: ${({ $fontFamily }) => $fontFamily}, sans-serif;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $fontColor }) => $fontColor};
  padding: ${({ $padding }) => $padding};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  margin: ${({ $margin }) => $margin};
  background-color: ${({ $bgColor }) => $bgColor};
  transition: 0.15s;
  cursor: ${({ $cursor }) => $cursor};

  &:hover {
    background-color: ${({ disabled, $bgColor }) =>
      !disabled &&
      ($bgColor === "#FFFFFF"
        ? lighten(0.03, theme.colors.whiteHoverColor)
        : $bgColor === "#000000"
          ? lighten(0.25, $bgColor ?? theme.colors.blackColor)
          : lighten(0.03, $bgColor ?? theme.colors.blackColor))};
  }

  &:active {
    background-color: ${({ disabled, $bgColor }) =>
      !disabled && darken(0.05, $bgColor ?? theme.colors.blackColor)};
  }

  &:disabled {
    color: ${theme.colors.lightGrayFontColor} !important;
    background-color: ${theme.colors.ultraLightGrayBgColor} !important;
  }
`;
