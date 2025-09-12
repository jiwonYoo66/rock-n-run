"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import * as R from "./reservation.style";
import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { COURSE_DATA, PRICE_DATA, PRODUCT_DATA } from "@lib/DUMMY";

import { Wrapper } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import StyledChartCalendar from "@components/styled/StyledChartCalendar";
import TabMenu from "@components/feature/tournament/detail/TabMenu";
import StyledButton from "@components/styled/StyledButton";

const TournamentDetail = () => {
    const router = useRouter();
    const { tourId } = useParams();
    const [selectedTab, setSelectedTab] = useState("대회정보");
    const [selectDate, setSelectDate] = useState(new Date());
    const [showMobileCalendar, setShowMobileCalendar] = useState(false);
    // useEffect(() => {
    //     if (state?.pageR.Info) {
    //         const { preCursor, nextCursor } = state?.pageR.Info;
    //         setPreCursor(preCursor);
    //         setNextCursor(nextCursor);
    //     }
    // }, [state?.pageR.Info]);

    return (
        <Wrapper>
            <Headline title={"장수 쿨밸리 트레일레이스"} />
            <R.LayoutWrapper>
                <R.DetailWrapper>
                    <R.ImageWrapper>
                        <Image
                            src="/assets/dummy/tour_post1.png"
                            alt="프로젝트 소개 이미지"
                            fill
                        />
                    </R.ImageWrapper>
                    <R.InfoWrapper>
                        <R.InfoBlock>
                            <R.InfoHeader>진행일정</R.InfoHeader>
                            <R.InfoContent>
                                2025.09.25(목) ~ 2025.09.28(일)
                            </R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>장소</R.InfoHeader>
                            <R.InfoContent>
                                전라북도 장수군 장수읍 12-1
                            </R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>진행종목</R.InfoHeader>
                            <R.InfoContent>
                                100M, 100K, 38K-J, 38K-P, 20K
                            </R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>사전접수</R.InfoHeader>
                            <R.InfoContent>
                                2025.09.25(목) 16:00 ~ 2025.09.28(일) 23:39
                            </R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>혜택</R.InfoHeader>
                            <R.InfoContent>티셔츠 제공</R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>주의사항</R.InfoHeader>
                            <R.InfoContent
                                $fontColor={theme.colors.activeOrange}
                            >{`대리신청 불가* \n 만 18세 이상 성인만 참가 가능*`}</R.InfoContent>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>코스별 모집인원</R.InfoHeader>
                            <R.InfoListWrapper>
                                {COURSE_DATA.map((data, index) => (
                                    <R.InfoList key={index}>
                                        <R.Info>{data?.type}</R.Info>
                                        <R.Info $disc>
                                            {data?.recruitment.toLocaleString()}
                                            명
                                        </R.Info>
                                    </R.InfoList>
                                ))}
                            </R.InfoListWrapper>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>가격</R.InfoHeader>
                            <R.InfoListWrapper>
                                {PRICE_DATA.map((data, index) => (
                                    <R.InfoList key={index}>
                                        <R.Info>{data?.type}</R.Info>
                                        <R.Info $disc>
                                            {data?.price.toLocaleString()}명
                                        </R.Info>
                                    </R.InfoList>
                                ))}
                            </R.InfoListWrapper>
                        </R.InfoBlock>
                        <R.InfoBlock>
                            <R.InfoHeader>공지</R.InfoHeader>
                            <R.InfoListWrapper>
                                {[
                                    "레드푸드레이스는 장수군의 대표 가을축제 '장수 한우랑 사과랑 축제’ 기간에 진행되는 숲길 마라톤입니다.",
                                    "코스는 잔디가 깔린 '승마로드'에서 진행되어 자연을 온몸으로 느낄 수 있는 특별한 마라톤입니다.",
                                ].map((data, index) => (
                                    <R.InfoList key={index}>
                                        <R.Info $disc>{data}</R.Info>
                                    </R.InfoList>
                                ))}
                            </R.InfoListWrapper>
                        </R.InfoBlock>
                    </R.InfoWrapper>
                    {/* 탭메뉴 */}
                    <TabMenu
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    {/* 탭메뉴에 따른 노출 정보 분기 처리 */}
                    <R.InfoDetail $padding="0 0 240px">
                        <R.InfoHeader>{selectedTab}</R.InfoHeader>
                        {selectedTab === "대회정보" && (
                            <>
                                <R.InfoDetail>
                                    <Image
                                        src="/assets/dummy/reservation_tour1.svg"
                                        alt="대회 소개 이미지"
                                        width={1} // 최소한의 값 (필수)
                                        height={1}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </R.InfoDetail>
                                <R.InfoDetail>
                                    <Image
                                        src="/assets/dummy/reservation_tour2.svg"
                                        alt="대회 소개 이미지"
                                        width={1}
                                        height={1}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </R.InfoDetail>
                            </>
                        )}
                        {selectedTab === "코스안내" && (
                            <R.InfoDetail>
                                <Image
                                    src="/assets/dummy/reservation_course1.svg"
                                    alt="코스 소개 이미지"
                                    width={1}
                                    height={1}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </R.InfoDetail>
                        )}
                        {selectedTab === "오시는길" && (
                            <R.InfoDetail>내용을 준비 중입니다.</R.InfoDetail>
                        )}
                        {selectedTab === "기념품소개" && (
                            <>
                                <R.InfoWrapper>
                                    {PRODUCT_DATA.map((data, index) => (
                                        <R.ProductWrapper key={index}>
                                            <R.ProductBadge>
                                                {data?.name}
                                            </R.ProductBadge>
                                            {data?.price !== 0 && (
                                                <R.ProductPrice>
                                                    정가{" "}
                                                    {data?.price.toLocaleString()}
                                                    원
                                                </R.ProductPrice>
                                            )}
                                            <R.InfoDetail
                                                key={index}
                                                $padding={
                                                    data?.price
                                                        ? "45px 8px 0"
                                                        : "73px 8px 0"
                                                }
                                            >
                                                <Image
                                                    src={data?.url}
                                                    alt="필수 장비 이미지"
                                                    width={1}
                                                    height={1}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </R.InfoDetail>
                                        </R.ProductWrapper>
                                    ))}
                                </R.InfoWrapper>
                            </>
                        )}
                        {selectedTab === "필수 장비" && (
                            <R.InfoDetail>
                                <Image
                                    src="/assets/dummy/reservation_eq1.svg"
                                    alt="필수 장비 이미지"
                                    width={1}
                                    height={1}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </R.InfoDetail>
                        )}
                        {selectedTab === "숙박" && (
                            <R.InfoDetail>내용을 준비 중입니다.</R.InfoDetail>
                        )}
                        {selectedTab === "셔틀버스" && (
                            <R.InfoDetail>내용을 준비 중입니다.</R.InfoDetail>
                        )}
                        {selectedTab === "스폰서" && (
                            <R.InfoDetail>내용을 준비 중입니다.</R.InfoDetail>
                        )}
                    </R.InfoDetail>
                </R.DetailWrapper>
                {/* 모바일 신청 & 캘린더 */}
                <R.MobileCalendar $show={showMobileCalendar}>
                    <StyledChartCalendar
                        value={selectDate}
                        onChange={(date) => setSelectDate(date as Date)}
                    />
                </R.MobileCalendar>
                <R.MobileSubmit>
                    <R.ExpectDate>대회까지 72일 3시간 남음</R.ExpectDate>
                    {showMobileCalendar ? (
                        <StyledButton
                            title="신청하기"
                            onClick={() =>
                                router.push(
                                    `/${paths.TOURNAMENT}/${tourId}/${paths.COURSE}`
                                )
                            }
                            fontSize={18}
                        />
                    ) : (
                        <StyledButton
                            title="일정 선택"
                            onClick={() => setShowMobileCalendar(true)}
                            fontSize={18}
                        />
                    )}
                </R.MobileSubmit>
                {/* PC 신청 & 캘린더 */}
                <R.CalendarWrapper>
                    <StyledChartCalendar
                        title="진행일정"
                        value={selectDate}
                        onChange={(date) => setSelectDate(date as Date)}
                        BORDER
                    />
                    <StyledButton
                        title="신청하기"
                        onClick={() =>
                            router.push(
                                `/${paths.TOURNAMENT}/${tourId}/${paths.COURSE}`
                            )
                        }
                        margin="32px 0 12px"
                        height={60}
                        fontSize={22}
                    />
                    <R.ExpectDate>대회까지 72일 3시간 남음</R.ExpectDate>
                </R.CalendarWrapper>
            </R.LayoutWrapper>
        </Wrapper>
    );
};

export default TournamentDetail;
