"use client";
import { Dispatch, memo, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Address } from "react-daum-postcode/lib/loadPostcode";
import { darken } from "polished";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

type StyledPostcodeProps = {
  ASTERISK?: boolean;
  id?: string;
  width?: number;
  height?: number;
  borderColor?: string;
  borderRadius?: number;
  margin?: string;
  title?: string;
  buttonTitle?: string;
  placeholder?: string;
  error?: boolean;
  value: string;
  setInputs: Dispatch<SetStateAction<Record<string, string>>>;
  disabled?: boolean;
};

const StyledPostcode = ({
  ASTERISK,
  id,
  width,
  height = 50,
  borderColor = theme.colors.lightGrayBorderColor,
  borderRadius = 4,
  margin,
  title = "주소",
  buttonTitle = "주소검색",
  placeholder = "우편번호",
  error,
  value = "",
  setInputs,
  disabled,
}: StyledPostcodeProps) => {
  const { width: winWidth, height: winHeight } = useWindowSize();
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const postcodeOptions = {
    width: 500,
    height: 600,
    left: winWidth! / 2 - 500 / 2,
    top: winHeight! / 2 - 600 / 2,
  };

  const onCompletePostcode = (data: Address) => {
    let address = data.address;
    let extraAddress = "";
    const zipcode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    return { address, zipcode };
  };

  const handleClick = () => {
    open({
      onComplete: (data: Address) => {
        const { address, zipcode } = onCompletePostcode(data);
        setInputs((prev) => {
          return {
            ...prev,
            address,
            zipcode,
          };
        });
      },
      ...postcodeOptions,
    });
  };

  return (
    <Wrapper $width={width} $margin={margin}>
      {title && (
        <Title>
          {title}
          {ASTERISK && <Asterisk>*</Asterisk>}
        </Title>
      )}
      <PostWrapper
        $width={width}
        $height={height}
        $borderColor={borderColor}
        $borderRadius={borderRadius}
        onClick={handleClick}
        $disabled={disabled}
      >
        <Input
          id={id}
          value={value}
          placeholder={placeholder}
          readOnly
          $error={error}
          $borderColor={borderColor}
          $borderRadius={borderRadius}
          $disabled={disabled}
        />
        <Button>{buttonTitle}</Button>
      </PostWrapper>
    </Wrapper>
  );
};

export default memo(StyledPostcode);

const Wrapper = styled.div<{
  $row?: boolean;
  $width?: number;
  $margin?: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  position: relative;
`;
const Title = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Asterisk = styled.span`
  color: ${theme.colors.activeOrange};
  margin-left: 2px;
`;
const PostWrapper = styled.div<{
  $width?: number;
  $height?: number;
  $borderColor?: string;
  $borderRadius?: number;
  $disabled?: boolean;
}>`
  position: relative;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => $height}px;
`;
const Input = styled.input<{
  $error?: boolean;
  $borderColor?: string;
  $borderRadius?: number;
  $disabled?: boolean;
  $button?: boolean;
}>`
  width: inherit;
  height: inherit;
  padding: ${({ $button }) =>
    $button ? "14px 100px 14px 12px" : "14px 40px 14px 12px"};
  border: ${({ $borderColor }) => $borderColor} 1px solid;
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  font-size: 14px;
  cursor: pointer;
  &::placeholder {
    font-size: 14px;
  }
  ${({ $error }) =>
    $error &&
    css`
      &:focus {
        border: red 1px solid;
      }
    `};
  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: ${theme.colors.ultraLightGrayBgColor};
    `}
`;
const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  color: ${theme.colors.blackColor};
  background-color: ${theme.colors.ultraLightGrayBgColor};
  padding: 0 10px;
  font-size: 13px;
  line-height: 22px;
  transition: all 0.25s;

  &:hover {
    background-color: ${darken(0.03, theme.colors.ultraLightGrayBgColor)};
  }
`;
