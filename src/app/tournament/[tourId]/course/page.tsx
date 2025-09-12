"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import * as C from "./course.style";

import {
    Wrapper,
    // CardContainer,
} from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import Breadcrumbs from "@components/layout/breadcrumbs/Breadcrumbs";
import CourseCard from "@components/feature/tournament/course/CourseCard";

const CourseList = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("대회정보");
    const [selectDate, setSelectDate] = useState(new Date());
    const [showMobileCalendar, setShowMobileCalendar] = useState(false);

    return (
        <Wrapper>
            <Headline title={"장수 쿨밸리 트레일레이스"} />
            <Breadcrumbs step={1} />
            <C.CardContainer>
                {[...Array(6)].map((data, index) => (
                    <CourseCard key={index} index={index} data={data} />
                ))}
            </C.CardContainer>
        </Wrapper>
    );
};

export default CourseList;
