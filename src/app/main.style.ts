"use client";
import styled from "styled-components";
import theme from "@styles/theme";

export const Wrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 48px - 485px);
  /* background-color: tomato;
  ${theme.devices.tablet} {
    background-color: skyblue;
  } */
  ${theme.devices.desktop} {
    min-height: calc(100vh - 105px - 425px);
    /* background-color: gold; */
  }
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  ${theme.devices.desktop} {
    flex-direction: row;
    justify-content: space-between;
    gap: 44px;
  }
`;
