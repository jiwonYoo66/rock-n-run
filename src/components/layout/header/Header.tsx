"use client";
import React, { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  IoChevronBackSharp,
  IoCloseSharp,
  IoHomeOutline,
} from "react-icons/io5";
import { paths } from "@lib/paths";
import { IoMenu } from "react-icons/io5";
import { dentalIdVar, dentalInfoVar } from "@store/index";
import logo from "@assets/images/logo.png";
import * as H from "./header.style";
import { useQuery } from "@apollo/client";
import { Query, SeeHpHospitalInfo } from "@graphql/types";
import { SEE_HP_HOSPITAL_INFO } from "@graphql/queries";

const Header = () => {
  const router = useRouter();
  const params = useParams<{ dentalId: string }>();
  const pathname = usePathname();
  const dentalId = +params.dentalId;
  const dentalInfo = useReactiveVar(dentalInfoVar);

  const { data, loading } = useQuery<Pick<Query, "seeHPHospitalInfo">>(
    SEE_HP_HOSPITAL_INFO,
    {
      variables: {
        hspId: dentalId,
      },
    }
  );

  const menuHidden =
    pathname.includes(paths.RETREATMENT) ||
    pathname.includes(paths.INSURANCE) ||
    pathname.includes(paths.PARKING) ||
    pathname.includes(paths.RESERVATION) ||
    pathname.includes(paths.NEWS) ||
    pathname.includes(paths.CARE) ||
    pathname.includes(paths.HEALTH) ||
    pathname.includes(paths.ABOUT);
  const backVisible = // 뒤로가기
    (pathname.split("/")?.[3] === paths.RESERVATION &&
      pathname.split("/")?.[4] !== paths.COMPLETE &&
      pathname.split("/")?.[4] !== paths.CONFIRM) ||
    // pathname.split("/")?.[4] === paths.INFO ||
    // pathname.split("/")?.[4] === paths.SCHEDULE ||
    // pathname.split("/")?.[4] === paths.EDIT ||
    (pathname.split("/")?.[3] === paths.RETREATMENT &&
      pathname.split("/")?.[4] !== paths.COMPLETE) ||
    (pathname.split("/")?.[3] === paths.INSURANCE &&
      pathname.split("/")?.[4] !== paths.COMPLETE) ||
    (pathname.split("/")?.[3] === paths.PARKING &&
      pathname.split("/")?.[4] !== paths.COMPLETE) ||
    pathname.split("/")?.[4] === paths.REGISTER ||
    pathname.split("/")?.[4] === paths.HISTORY ||
    pathname.includes(paths.NEWS) ||
    pathname.includes(paths.CARE) ||
    pathname.includes(paths.HEALTH) ||
    pathname.includes(paths.ABOUT);
  const closeVisible = pathname.split("/")?.[4] === paths.COMPLETE; // 닫기
  // const navVisible = pathname === paths.HOME; // Nav 목록
  const navVisible = pathname === `/dental/${params.dentalId}`; // Nav 목록
  const isNotDesktop = // 예약 페이지
    pathname.includes(paths.RETREATMENT) ||
    pathname.includes(paths.INSURANCE) ||
    pathname.includes(paths.PARKING) ||
    pathname.includes(paths.RESERVATION) ||
    pathname.includes(paths.NEWS) ||
    pathname.includes(paths.CARE) ||
    pathname.includes(paths.HEALTH) ||
    pathname.includes(paths.ABOUT);
  const kakaoUrlHeader = pathname.split("/")?.[4] === paths.CONFIRM; // 카카오 url 접근 헤더

  const headerTitle = () => {
    let detailId = pathname.split("/")?.[4];

    if (!dentalId) return "";

    if (!detailId && pathname.split("/")?.[3] === paths.NEWS) {
      return "병원 최신 소식";
    }
    if (!detailId && pathname.split("/")?.[3] === paths.CARE) {
      return "치료 후 주의사항";
    }
    if (!detailId && pathname.split("/")?.[3] === paths.HEALTH) {
      return "건강 정보";
    }
    if (pathname.split("/")?.[3] === paths.ABOUT) {
      return "의료진 정보";
    }
  };

  const closeButtonPath = () => {
    if (pathname.includes(paths.RESERVATION)) {
      return `/${paths.DENTAL}/${dentalId}/${paths.RESERVATION}/${paths.INFO}`;
    }
    return `/${paths.DENTAL}/${dentalId}`;
  };

  const handleGoBack = () => {
    if (
      pathname === `/${paths.DENTAL}/${dentalId}/${paths.RESERVATION}` ||
      pathname === `/${paths.DENTAL}/${dentalId}/${paths.RETREATMENT}`
    ) {
      router.push(`/${paths.DENTAL}/${dentalId}`);
    } else if (pathname.includes(`${paths.RESERVATION}/${paths.INFO}`)) {
      router.push(`/${paths.DENTAL}/${dentalId}/${paths.RESERVATION}`);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (dentalId) dentalIdVar(dentalId);
    if (!loading && data) {
      dentalInfoVar(data?.seeHPHospitalInfo as SeeHpHospitalInfo);
    }
  }, [dentalId, data, loading]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    if (
      !pathname.includes(paths.RESERVATION) &&
      !pathname.includes(paths.RETREATMENT)
    ) {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("scheduleInfo");
      sessionStorage.removeItem("pathType");
    }
  }, [pathname]);

  return (
    <H.Wrapper>
      <H.Contents $isNotDesktop={isNotDesktop}>
        <H.FlexibleBox>
          <H.ControlButton $visible={backVisible} onClick={handleGoBack}>
            <IoChevronBackSharp fontSize={24} />
          </H.ControlButton>
          <H.ControlButton
            $visible={kakaoUrlHeader}
            onClick={() => router.push(`/${paths.DENTAL}/${dentalId}`)}
          >
            <IoHomeOutline fontSize={24} />
          </H.ControlButton>
          <H.Logo
            $visible={menuHidden}
            onClick={() =>
              (window.location.href = `/${paths.DENTAL}/${dentalId}`)
            }
          >
            <H.NextImage
              quality={100}
              width={74}
              height={36}
              src={logo}
              alt="Logo"
            />
          </H.Logo>
        </H.FlexibleBox>
        <H.FlexibleBox>
          {headerTitle() ? (
            <H.Title>{headerTitle()}</H.Title>
          ) : (
            <H.NavList $visible={navVisible}>
              <H.NavLink href={`${params.dentalId}/${paths.RETREATMENT}`}>
                접수
              </H.NavLink>
              <H.NavLink href={`${params.dentalId}/${paths.RESERVATION}`}>
                진료 예약
              </H.NavLink>
              <H.NavLink href={`${params.dentalId}/${paths.INSURANCE}`}>
                보험 청구
              </H.NavLink>
              <H.NavLink href={`${params.dentalId}/${paths.PARKING}`}>
                주차 신청
              </H.NavLink>
              {/* <H.NavLink href={`${params.dentalId}/${paths.PRODUCT}`}>
                상품 구매
              </H.NavLink> */}
              <H.NavLink href={`${params.dentalId}/${paths.MAP}`}>
                오시는 길
              </H.NavLink>
              <H.NavLink href={`tel:${dentalInfo?.hospTel}`}>
                전화 걸기
              </H.NavLink>
            </H.NavList>
          )}
        </H.FlexibleBox>
        <H.FlexibleBox>
          <H.Hamburger $hidden={menuHidden}>{/*<IoMenu />*/}</H.Hamburger>
          <H.ControlButton
            $visible={closeVisible}
            onClick={() => {
              sessionStorage.removeItem("pathType");
              router.push(closeButtonPath());
            }}
          >
            <IoCloseSharp fontSize={24} />
          </H.ControlButton>
          <H.HospitalName $visible={kakaoUrlHeader}>
            {dentalInfo?.hospNm ? dentalInfo?.hospNm : ""}
          </H.HospitalName>
        </H.FlexibleBox>
      </H.Contents>
    </H.Wrapper>
  );
};

export default Header;
