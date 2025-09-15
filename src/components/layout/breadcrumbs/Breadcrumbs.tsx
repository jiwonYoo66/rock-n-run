"use client";
import styled, { css } from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";

import theme from "@styles/theme";

const Breadcrumbs = ({ step }: any) => {
  return (
    <Wrapper>
      <Process>
        <Step $active={step === 1}>01. 코스 선택</Step>
        <MdKeyboardArrowRight
          size={16}
          color={theme.colors.lightGrayFontColor}
        />
        <Step $active={step === 2}>02. 약관동의</Step>
        <MdKeyboardArrowRight
          size={16}
          color={theme.colors.lightGrayFontColor}
        />
        <Step $active={step === 3}>03. 정보 입력</Step>
      </Process>
      <Timer>
        <TimerText className="notranslate">
          <Number>21</Number>D
        </TimerText>
        <Colon>:</Colon>
        <TimerText className="notranslate">
          <Number>16</Number>H
        </TimerText>
        <Colon>:</Colon>
        <TimerText className="notranslate">
          <Number>41</Number>M
        </TimerText>
        <Colon>:</Colon>
        <TimerText className="notranslate">
          <Number>30</Number>S
        </TimerText>
      </Timer>
    </Wrapper>
  );
};

export default Breadcrumbs;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px 0;
  width: 100%;
  border-top: ${theme.colors.blackColor} 1px solid;
  border-bottom: ${theme.colors.blackColor} 1px solid;
  ${theme.devices.desktop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
const Process = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Step = styled.span<{ $active?: boolean }>`
  ${theme.typography.caption}
  font-family: PretendardMedium,sans-serif;
  color: ${theme.colors.lightGrayFontColor};

  ${({ $active }) =>
    $active &&
    css`
      color: ${theme.colors.blackColor};
      font-family: PretendardSemiBold, sans-serif;
    `};
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
const Timer = styled.div`
  display: flex;
  gap: 12px;
  /* align-items: center; */
`;
const TimerText = styled.span`
  ${theme.typography.caption}
  font-family: PretendardMedium,sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
const Number = styled.span`
  ${theme.typography.bodyDesktop}
  font-family: Tenada,sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.largeTitle}
  }
`;
const Colon = styled.span`
  font-size: 24px;
  line-height: 28px;
  font-family: PretendardMedium, sans-serif;
  ${theme.devices.desktop} {
    font-size: 32px;
    line-height: 36px;
  }
`;
