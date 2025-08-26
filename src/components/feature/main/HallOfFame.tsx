"use client";
import styled, { css } from "styled-components";

import theme from "@styles/theme";

import Headline from "@components/layout/headline/Headline";
import StyledSelect from "@components/styled/StyledSelect";
import { ChangeEvent, useState } from "react";

const HallOfFame = () => {
  const [filter, setFilter] = useState(1);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter(+value);
  };

  return (
    <Wrapper>
      <Headline
        title="명예의 전당"
        imgSrc="./assets/icons/icon_trophy.svg"
        padding="60px 0 20px"
        onClick={() => null}
        MORE
      />
      <StyledSelect
        value={filter}
        options={[{ title: "종합순위", value: 1 }]}
        onChange={onChange}
        width={84}
        height={22}
        padding="0"
        fontFamily="PretendardMedium"
        fontSize={18}
        DATA_VALUE
      />
      <ul>
        <li>
          <div>
            <div>
              <span>Rank</span>
              <span>1</span>
            </div>
            <div>
              <span>01:12:45</span>
              <span>김영록</span>
            </div>
          </div>
          <ul>
            <li>
              <span>배번</span>
              <span>1002</span>
            </li>
            <li>
              <span>이름</span>
              <span>김영록</span>
            </li>
            <li>
              <span>국적</span>
              <span>대한민국</span>
            </li>
          </ul>
        </li>
      </ul>
    </Wrapper>
  );
};

export default HallOfFame;

// clip-path: polygon(100% 0, 100% 100%, 50% 90%, 0 100%, 0 0);

const Wrapper = styled.section`
  width: 100%;
  background-color: tomato;
  ${theme.devices.desktop} {
    width: calc((100% - 308px) / 8 * 5 + 176px);
  }
`;

const CardContainer = styled.ul`
  display: flex;
`;
