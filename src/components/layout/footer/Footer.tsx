"use client";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";

import theme from "@styles/theme";
import { paths } from "@lib/paths";

import { Container, FlexBox } from "@components/share/commons/commons.style";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <FirstBlock>
          <Image
            width={160}
            height={21}
            src="./assets/images/logo.svg"
            alt="Logo"
          />
          <FlexBox $justifyContent="flex-end" $gap={12}>
            <Button
              onClick={() =>
                window.open("https://www.instagram.com/jangsutrailrace")
              }
            >
              <Image
                width={24}
                height={24}
                src="./assets/icons/icon_insta.svg"
                alt="instagram icon"
              />
            </Button>
            <Button
              onClick={() =>
                window.open("https://www.youtube.com/@rocknrunkorea")
              }
            >
              <Image
                width={24}
                height={24}
                src="./assets/icons/icon_youtube.svg"
                alt="youtube icon"
              />
            </Button>
          </FlexBox>
        </FirstBlock>
        <SecondBlock>
          <BoldFont>고객센터 1588-0001</BoldFont>
          <InfoFont $fontColor={theme.colors.deepGrayFontColor}>
            운영시간: 09:30 ~ 18:30 (주말/공휴일 휴무)
          </InfoFont>
        </SecondBlock>
        <ThirdBlock>
          <FlexBox>
            <PolicyLink href={`/${paths.PRIVACY}`}>개인정보처리방침</PolicyLink>
            <PolicyLink href={`/${paths.TERMS}`} $fontFamily="PretendardMedium">
              이용약관
            </PolicyLink>
          </FlexBox>
          <FlexBox $flexWrap="wrap">
            <InfoFont>대표 김영록</InfoFont>
            <InfoFont $border>사업자등록번호 156-81-03314</InfoFont>
            <InfoFont $border $isDesktop>
              통신판매업신고번호 제2025-전북장수-0007
            </InfoFont>
            <InfoFont $border $isDesktop>
              메일 info@rockandrun.kr
            </InfoFont>
          </FlexBox>
          <InfoFont $isMobile>통신판매업신고번호 제2025-전북장수-0007</InfoFont>
          <InfoFont $isMobile>메일 info@rockandrun.kr</InfoFont>
          <InfoFont>전북특별자치도 장수군 장수읍 노하2길 9-4</InfoFont>
          <InfoFont>&copy; ROCKANDRUN ALL RIGHT RESERVED</InfoFont>
        </ThirdBlock>
      </Container>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  padding: 16px 40px 80px;
  width: 100%;
  border-top: ${theme.colors.blackColor} 1px solid;
`;

const Block = styled.div`
  padding: 24px 0;
  border-bottom: ${theme.colors.ultraLightGrayBgColor} 1px solid;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
`;

const FirstBlock = styled(Block)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SecondBlock = styled(Block)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ThirdBlock = styled(Block)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BoldFont = styled.div`
  font-size: 13px;
  line-height: 21px;
  font-family: PretendardBold, sans-serif;
`;

const PolicyLink = styled(Link)<{ $fontFamily?: string }>`
  position: relative;
  padding-right: 8px;
  font-size: 13px;
  line-height: 21px;
  font-family:
    ${({ $fontFamily }) => ($fontFamily ? $fontFamily : "PretendardBold")},
    sans-serif;
  &:last-child {
    padding-left: 9px;
    &::before {
      content: "";
      position: absolute;
      top: 5px;
      left: 0;
      display: inline-block;
      width: 1px;
      height: 9px;
      background-color: ${theme.colors.textSeperateBorder};
    }
  }
`;

const InfoFont = styled.span<{
  $fontColor?: string;
  $border?: boolean;
  $isMobile?: boolean;
  $isDesktop?: boolean;
}>`
  ${theme.typography.caption}
  display: inline-block;
  padding-right: 8px;
  color: ${({ $fontColor }) =>
    $fontColor ? $fontColor : theme.colors.blackColor};

  ${({ $border }) =>
    $border &&
    css`
      position: relative;
      padding-left: 9px;
      &::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 0;
        width: 1px;
        height: 9px;
        background-color: ${theme.colors.textSeperateBorder};
      }
    `}

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      ${theme.devices.desktop} {
        display: none;
      }
    `}

    ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      display: none;
      ${theme.devices.desktop} {
        display: inline-block;
      }
    `}
`;
