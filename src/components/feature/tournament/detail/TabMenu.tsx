"use client";
import styled from "styled-components";
import theme from "@styles/theme";

const TabMenuOptions = [
  "대회정보",
  "코스안내",
  "오시는길",
  "기념품소개",
  "필수 장비",
  "숙박",
  "셔틀버스",
  "스폰서",
];

const TabMenu = ({ selectedTab, setSelectedTab }: any) => {
  return (
    <Wrapper>
      <TabWrapper>
        {TabMenuOptions.map((data, index) => (
          <Tab key={index} onClick={() => setSelectedTab(data)}>
            {data}
          </Tab>
        ))}
      </TabWrapper>
    </Wrapper>
  );
};

export default TabMenu;

const Wrapper = styled.div`
  margin: 52px 0 16px;
  width: 100%;
  overflow: auto;
  ${theme.devices.desktop} {
    margin: 60px 0 20px;
  }
`;
const TabWrapper = styled.ul`
  display: flex;
  gap: 12px;
`;
const Tab = styled.li`
  ${theme.typography.headline2}
  padding: 4px 12px;
  border: ${theme.colors.blackColor} 1px solid;
  text-align: center;
  white-space: pre;
  cursor: pointer;
  transition: all.25s;
  ${theme.devices.desktop} {
    ${theme.typography.bodyDesktop}
  }
  &:hover {
    background-color: ${theme.colors.whiteHoverColor};
  }
`;
