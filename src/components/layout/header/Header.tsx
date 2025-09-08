"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import { useQuery, useReactiveVar } from "@apollo/client/react";
import styled from "styled-components";

import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { userVar } from "@store/index";
import { getCookie } from "@utils/cookies";
import { userLogout } from "src/modules/authentication";

import { Container } from "@components/share/commons/commons.style";

const Header = () => {
  const router = useRouter();
  const userInfo = useReactiveVar(userVar);
  const [langChange, setLangChange] = useState(false);
  const isLoggedIn = getCookie("RNRT") ?? false;

  useEffect(() => {
    if (getCookie("googtrans")?.includes("en")) {
      setLangChange(true);
    } else {
      setLangChange(false);
    }
  }, []);

  const langChangeHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    const element = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }

    if (value.includes("ko")) {
      setLangChange(false);
      // window.location.reload();
      // return;
    } else {
      setLangChange(true);
    }
  };

  // const { data, loading } = useQuery<Pick<Query, "seeHPHospitalInfo">>(
  //   SEE_HP_HOSPITAL_INFO,
  //   {
  //     variables: {
  //       hspId: dentalId,
  //     },
  //   }
  // );

  // useEffect(() => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, []);

  return (
    <Wrapper>
      {/* 상단 공지 & 메뉴 */}
      <TopHeader>
        <HeaderContainer $padding="0 16px">
          {/* 공지 */}
          <TextBanner>
            락앤런 컴퍼니에 오신 것을 환영합니다. 지금 장수 쿨밸리 레이스 참가
            신청 모집이 진행중에 있습니다. 추첨을 통해 진행되며 추첨 내용은 추후
            공지됩니다. 많은 관심 부탁드립니다.
          </TextBanner>
          {/* 상단 메뉴 */}
          <TopMenu>
            <YellowMenu>
              <YellowLink href={`/${paths.TOURNAMENT}/${paths.RESULT}`}>
                대회결과
                <Image
                  width={16}
                  height={16}
                  src="./assets/icons/icon_run.svg"
                  alt="running icon"
                />
              </YellowLink>
              <Bar />
              <YellowLink href={`/${paths.GALLERY}`}>
                갤러리
                <Image
                  width={16}
                  height={16}
                  src="./assets/icons/icon_gallery.svg"
                  alt="gallery icon"
                />
              </YellowLink>
            </YellowMenu>
            <BlackMenu>
              <BlackButton onClick={() => router.push(`/${paths.MYINFO}`)}>
                내정보
              </BlackButton>
              {isLoggedIn ? (
                <BlackButton onClick={userLogout}>로그아웃</BlackButton>
              ) : (
                <BlackButton onClick={() => router.push(`/${paths.LOGIN}`)}>
                  로그인
                </BlackButton>
              )}
            </BlackMenu>
          </TopMenu>
        </HeaderContainer>
      </TopHeader>
      {/* 네비게이션 헤더 */}
      <NavHeader>
        <HeaderContainer $padding="0 16px">
          <Link href={paths.HOME}>
            <Image
              width={160}
              height={21}
              src="./assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <Navigation>
            <Link href={`/${paths.TOURNAMENT}`}>대회</Link>
            <Link href={`/${paths.PROGRAM}`}>프로그램</Link>
            <Link href={`/${paths.CALENDAR}`}>캘린더</Link>
            <Link href={`/${paths.SHOP}`}>스토어</Link>
            <Link href={`/${paths.NEWS}`}>소식</Link>
          </Navigation>
          {langChange ? (
            <LangButton
              value="ko"
              onClick={langChangeHandler}
              className="notranslate"
            >
              KOR
            </LangButton>
          ) : (
            <LangButton
              value="en"
              onClick={langChangeHandler}
              className="notranslate"
            >
              ENG
            </LangButton>
          )}

          <MenuButton>
            <Image
              width={24}
              height={24}
              src="./assets/icons/icon_menu.svg"
              alt="menu icon"
            />
          </MenuButton>
        </HeaderContainer>
      </NavHeader>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 5;
`;

const TopHeader = styled.div`
  display: none;
  width: 100%;
  height: 40px;
  background-color: ${theme.colors.blackColor};
  ${theme.devices.desktop} {
    display: block;
  }
`;

const NavHeader = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: ${theme.colors.blackColor} 1px solid;
  background-color: ${theme.colors.whiteColor};
  ${theme.devices.desktop} {
    height: 65px;
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const TextBanner = styled.div`
  ${theme.typography.bodyMobile}
  padding: 0 40px 0 0;
  width: calc(100% - 390px);
  color: ${theme.colors.whiteColor};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TopMenu = styled.ul`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 12px;
  height: 100%;
`;
const YellowMenu = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 254px;
  height: 100%;
  background-color: ${theme.colors.pointYellow};
`;
const Bar = styled.span`
  display: inline-block;
  width: 0.5px;
  height: 12px;
  background-color: ${theme.colors.blackColor};
`;
const YellowLink = styled(Link)`
  ${theme.typography.bodyMobile}
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px 10px;
  width: 125px;
  font-family: PretendardMedium, sans-serif;
`;
const BlackMenu = styled.li`
  display: flex;
  align-items: center;
  width: 124px;
  height: 100%;
`;
const BlackButton = styled.button`
  ${theme.typography.bodyMobile}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
  color: ${theme.colors.whiteColor};
`;
const Navigation = styled.nav`
  ${theme.typography.bodyDesktop}
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* display: flex; */
  display: none;
  justify-content: center;
  align-items: center;
  gap: 40px;
  font-family: PretendardBold, sans-serif;
  ${theme.devices.desktop} {
    display: flex;
  }
`;

const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  ${theme.devices.desktop} {
    display: none;
  }
`;

const LangButton = styled.button`
  ${theme.typography.bodyMobile}
  display: none;
  padding: 4px 8px;
  border-radius: 16px;
  color: ${theme.colors.whiteColor};
  background-color: ${theme.colors.blackColor};
  font-family: PretendardMedium, sans-serif;
  /* line-height: 1; */
  ${theme.devices.desktop} {
    display: block;
  }
`;
