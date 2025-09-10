import React, { ChangeEvent, memo, useEffect } from "react";
import styled, { css } from "styled-components";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { ko } from "date-fns/locale";
import { getYear, getMonth } from "date-fns";
import { getYearOption } from "@utils/commons";
import theme from "@styles/theme";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

type StyledCalendarProps = {
  BORDER?: boolean;
  title?: string;
  name?: string;
  width?: number;
  margin?: string;
  dateFormat?: string;
  value: Date;
  onChange: (date: Date | null) => void;
  excludeDates?: Date[];
};

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const years = getYearOption();
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <Header>
      {!prevMonthButtonDisabled && (
        <ArrowBox>
          <RiArrowLeftSLine
            fontSize={22}
            color={theme.colors.whiteColor}
            onClick={decreaseMonth}
          />
        </ArrowBox>
      )}
      <SelectBox
        value={getYear(date)}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          changeYear(parseInt(e.target.value, 10))
        }
      >
        {years?.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectBox>
      <SelectBox
        value={months[getMonth(date)]}
        onChange={(e) => changeMonth(months.indexOf(e.target.value))}
      >
        {months?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectBox>
      {!nextMonthButtonDisabled && (
        <ArrowBox>
          <RiArrowRightSLine
            fontSize={22}
            color={theme.colors.whiteColor}
            onClick={increaseMonth}
          />
        </ArrowBox>
      )}
    </Header>
  );
};

const StyledChartCalendar = ({
  BORDER,
  title,
  name,
  width,
  margin,
  dateFormat = "yyyy-MM-dd",
  value = new Date(),
  onChange = () => null,
  excludeDates = [],
}: StyledCalendarProps) => {
  return (
    <Wrapper $width={width} $margin={margin} $border={BORDER}>
      {title && <Title>{title}</Title>}
      <DateBox>
        <DatePicker
          dateFormat={dateFormat}
          locale={ko as any}
          selected={value}
          onChange={onChange}
          excludeDates={excludeDates}
          dateFormatCalendar="YYYY.MM"
          inline
          // renderCustomHeader={({
          //   monthDate,
          //   date,
          //   changeYear,
          //   changeMonth,
          //   decreaseMonth,
          //   increaseMonth,
          //   decreaseYear,
          //   increaseYear,
          //   prevMonthButtonDisabled,
          //   nextMonthButtonDisabled,
          //   prevYearButtonDisabled,
          //   nextYearButtonDisabled,
          // }: ReactDatePickerCustomHeaderProps): React.ReactElement => {
          //   return (
          //     <CustomHeader
          //       monthDate={monthDate}
          //       date={date}
          //       changeYear={changeYear}
          //       changeMonth={changeMonth}
          //       decreaseMonth={decreaseMonth}
          //       increaseMonth={increaseMonth}
          //       customHeaderCount={1}
          //       decreaseYear={decreaseYear}
          //       increaseYear={increaseYear}
          //       prevMonthButtonDisabled={prevMonthButtonDisabled}
          //       nextMonthButtonDisabled={nextMonthButtonDisabled}
          //       prevYearButtonDisabled={prevYearButtonDisabled}
          //       nextYearButtonDisabled={nextYearButtonDisabled}
          //     />
          //   );
          // }}
        />
      </DateBox>
    </Wrapper>
  );
};

export default memo(StyledChartCalendar);

const Wrapper = styled.div<{
  $column?: boolean;
  $width?: number;
  $margin?: string;
  $border?: boolean;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  ${({ $border }) =>
    $border &&
    css`
      padding: 32px 27.5px;
      border: ${theme.colors.blackColor} 1px solid;
    `}
`;
const Title = styled.div`
  margin: 0 0 20px;
  font-size: 20px;
  font-family: PretendardMedium, sans-serif;
  line-height: 1;
`;

const DateBox = styled.div<{
  $column?: boolean;
  $arrow?: boolean;
  $calendar?: boolean;
  $margin?: string;
}>`
  .react-datepicker {
    width: 100%;
    border: none;
    .react-datepicker__navigation {
      top: 28px;
      width: 16px;
      height: 16px;
    }
    .react-datepicker__navigation-icon {
      font-size: 16px;
      &::before {
        border: 1px solid #b5bec6;
        border-width: 1px 1px 0 0;
        width: 6px;
        height: 6px;
      }
    }
  }
  .react-datepicker__current-month {
    font-size: 20px;
    font-family: PretendardSemiBold, sans-serif;
  }
  .react-datepicker__header {
    padding: 24px 0;
    border-bottom: none;
    background-color: transparent;
  }
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
  }
  .react-datepicker__day-name {
    color: #b5bec6;
    font-size: 16px;
    font-family: PretendardMedium, sans-serif;
  }
  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: #4a5660;
    font-size: 20px;
    font-family: PretendardMedium, sans-serif;
    line-height: 1;
  }
  .react-datepicker__day--selected {
    color: ${theme.colors.blackColor};
    background-color: ${theme.colors.pointYellow};
    border-radius: 50%;
  }
  .react-datepicker__day--excluded {
    color: ${theme.colors.lightGrayFontColor};
  }
  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
    /* margin: 0 0 8px; */
  }
  .react-datepicker__day:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text:not([aria-disabled="true"]):hover {
    background-color: #f0f0f0;
    border-radius: 50%;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
  }

  ${({ $calendar }) =>
    $calendar &&
    css`
      background-image: url("./assets/icons/icon_calendar.svg");
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: top 50% right 0;
    `};

  ${({ $arrow }) =>
    $arrow &&
    css`
      background-image: url("./assets/icons/icon_selectArrow.svg");
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: top 50% right 0;
    `};

  ${({ $column }) =>
    $column &&
    css`
      width: 100%;
      height: 50px;
      padding: 0 12px;
      /* border-radius: 4px; */
      border: 1px solid ${theme.colors.lightGrayBorderColor};
      background-position: top 50% right 12px;

      .react-datepicker-wrapper,
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    `};
`;

const ArrowBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SelectBox = styled.select`
  width: 68px;
  height: 26px;
  padding: 0 6px;
  text-align: left;
  border: none;
  border-radius: 4px;
  background-image: url("./assets/icons/icon_selectArrow.svg");
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: right 6px top 52%;
  background-color: ${theme.colors.whiteColor};
  &:nth-child(1) {
    width: 48px;
  }
`;
