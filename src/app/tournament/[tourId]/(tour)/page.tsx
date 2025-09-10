"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import useCustomSearchParams from "@hooks/useCustomSearchParams";
import usePagination from "@hooks/usePagination";
import { paths } from "@lib/paths";

import {
  Wrapper,
  CardContainer,
} from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import StyledChartCalendar from "@components/styled/StyledChartCalendar";

const TournamentDetail = () => {
  const router = useRouter();
  const [selectDate, setSelectDate] = useState(new Date());
  // useEffect(() => {
  //     if (state?.pageInfo) {
  //         const { preCursor, nextCursor } = state?.pageInfo;
  //         setPreCursor(preCursor);
  //         setNextCursor(nextCursor);
  //     }
  // }, [state?.pageInfo]);

  return (
    <Wrapper>
      상세
      {/* <StyledChartCalendar
        title="진행일정"
        value={selectDate}
        onChange={(date) => setSelectDate(date as Date)}
        width={345}
        BORDER
      /> */}
    </Wrapper>
  );
};

export default TournamentDetail;
