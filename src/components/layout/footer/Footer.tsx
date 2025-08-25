"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { paths } from "@lib/paths";
import * as F from "./footer.style";
import { useReactiveVar } from "@apollo/client";
import { dentalInfoVar } from "@store/index";

const Footer = () => {
  const pathname = usePathname();
  const hidden =
    pathname.includes(paths.RESERVATION) ||
    pathname.includes(paths.RETREATMENT) ||
    pathname.includes(paths.INSURANCE) ||
    pathname.includes(paths.PARKING);
  const dentalInfo = useReactiveVar(dentalInfoVar);

  return (
    <F.Wrapper $hidden={hidden}>
      <F.Contents>
        <F.SiteMap>
          <F.MenuLink>이용약관</F.MenuLink>
          <F.MenuLink>개인정보처리방침</F.MenuLink>
          <F.MenuLink>환자의 권리장전</F.MenuLink>
          <F.MenuLink>비급여진료비</F.MenuLink>
        </F.SiteMap>
        <F.HospitalInfo>
          {dentalInfo?.hospNm && (
            <F.InfoText>
              상호명 : {dentalInfo?.hospNm}
              {/*경기도 성남시 수정구 오야남로 13, (주)큐브*/}
            </F.InfoText>
          )}
          {dentalInfo?.hospOpenTm && dentalInfo?.hospCloseTm && (
            <F.InfoText>
              운영시간 : {dentalInfo.hospOpenTm} ~ {dentalInfo.hospCloseTm}
              {/*경기도 성남시 수정구 오야남로 13, (주)큐브*/}
            </F.InfoText>
          )}
          {(dentalInfo?.hospAddr || dentalInfo?.hospAddrDetail) && (
            <F.InfoText>
              주소 : {dentalInfo?.hospAddr || "-"}
              {dentalInfo?.hospAddrDetail
                ? `, ${dentalInfo?.hospAddrDetail}`
                : ""}
              {/*경기도 성남시 수정구 오야남로 13, (주)큐브*/}
            </F.InfoText>
          )}
          {dentalInfo?.hospTel && (
            <F.InfoText>
              대표전화 : {dentalInfo.hospTel}
              {/*경기도 성남시 수정구 오야남로 13, (주)큐브*/}
            </F.InfoText>
          )}

          {/*<F.InfoText>대표자명 : 장관익</F.InfoText>*/}
          {/*<F.InfoText>요양기관 번호 : 737-81-03258</F.InfoText>*/}
          <F.InfoText>ⓒ 2024 치과 예약관리 솔루션, (주) 큐브</F.InfoText>
        </F.HospitalInfo>
      </F.Contents>
    </F.Wrapper>
  );
};

export default Footer;
