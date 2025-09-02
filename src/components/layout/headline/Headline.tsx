"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";

import theme from "@styles/theme";

import { FlexBox } from "@components/share/commons/commons.style";

type HeadlineProps = {
  MORE?: boolean;
  BORDER?: boolean;
  TAB?: boolean;
  title: string;
  imgSrc?: string;
  paddingMobile?: string;
  paddingPc?: string;
  onClick?: () => void;
  setSelectedTab?: Dispatch<SetStateAction<string>>;
  selectedTab?: string;
  options?: string[];
  margin?: string;
};

const Headline = ({
  title = "",
  imgSrc = "",
  paddingMobile = "52px 0 20px",
  paddingPc = "80px 0 32px",
  onClick = () => null,
  options = [],
  setSelectedTab,
  selectedTab,
  MORE = false,
  BORDER = false,
  TAB = false,
}: HeadlineProps) => {
  return (
    <Wrapper
      $paddingMobile={paddingMobile}
      $paddingPc={paddingPc}
      $border={BORDER}
    >
      <Title>
        {/* {title} */}
        {TAB ? (
          <FlexBox>
            {options.map((option: string, index: number) => (
              <TabMenu key={`${index}-${option}`}>
                <Input
                  type="radio"
                  id={`${index}-filter`}
                  name="filter"
                  value={option}
                  onChange={(e) =>
                    setSelectedTab && setSelectedTab(e.target.value)
                  }
                  checked={option === selectedTab}
                />
                <Label htmlFor={`${index}-filter`}>{option}</Label>
              </TabMenu>
            ))}
          </FlexBox>
        ) : (
          title
        )}
        {imgSrc && (
          <IconWrapper>
            <Image src={imgSrc} alt="title icon" fill />
          </IconWrapper>
        )}
      </Title>
      {MORE && <MoreButton onClick={onClick}>더보기+</MoreButton>}
    </Wrapper>
  );
};

export default Headline;

const Wrapper = styled.div<{
  $paddingMobile?: string;
  $paddingPc?: string;
  $border?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $paddingMobile }) => $paddingMobile};

  ${theme.devices.desktop} {
    padding: ${({ $paddingPc }) => $paddingPc};

    ${({ $border }) =>
      $border &&
      css`
        border-bottom: ${theme.colors.blackColor} 1px solid;
      `}
  }
`;

const Title = styled.h2`
  ${theme.typography.largeTitle}
  display: flex;
  align-items: baseline;
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.emphasizedTitle}
  }
`;

const TabMenu = styled.div`
  margin: 0 6px 0 0;
  ${theme.devices.desktop} {
    margin: 0 28px 0 0;
  }
`;

const Label = styled.label`
  ${theme.typography.largeTitle}
  display: flex;
  align-items: baseline;
  font-family: Tenada, sans-serif;
  color: ${theme.colors.lightGrayFontColor};
  transition: all 0.25s;
  cursor: pointer;
  ${theme.devices.desktop} {
    ${theme.typography.emphasizedTitle}
  }
`;

const Input = styled.input`
  display: none;
  &:checked ~ label {
    color: ${theme.colors.blackColor};
    /* border-bottom: ${theme.colors.positiveBlue} 2px solid; */
  }
`;

const IconWrapper = styled.div`
  position: relative;
  margin-left: 8px;
  width: 20px;
  height: 20px;
  ${theme.devices.desktop} {
    width: 28px;
    height: 28px;
  }
`;

const MoreButton = styled.button`
  ${theme.typography.headline2}
  color:${theme.colors.lightGrayFontColor};
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline1}
  }
`;
