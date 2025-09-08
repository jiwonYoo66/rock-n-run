import { ChangeEvent } from "react";

export type TypographyType = {
  fontSize: string;
  lineHeight: string;
};

export type DataValueType = {
  title: string;
  value: string | number;
  option?: any;
  option2?: any;
};

export type FlexBoxType = {
  $width?: string;
  $height?: string;
  $flex?: number;
  $flexDirection?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $flexWrap?: string;
  $gap?: number;
  $margin?: string;
  $padding?: string;
  $border?: string;
  $fontColor?: string;
  $fontSize?: number;
  $fontFamily?: string;
};

export type onChangeEventType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;
