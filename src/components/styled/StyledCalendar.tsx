"use client";
import React, { ChangeEvent, memo, useEffect } from "react";
import styled, { css } from "styled-components";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { ko } from "date-fns/locale";
import { getYear, getMonth } from "date-fns";
import { getYearOption } from "@utils/commons";
import theme from "@styles/theme";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
// import { RegularFont } from '@components/styled/StyledComponents';

type StyledCalendarProps = {
  COLUMN?: boolean;
  ARROW?: boolean;
  CALENDAR?: boolean;
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

  console.log(years);
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

const StyledCalendar = ({
  COLUMN,
  ARROW,
  CALENDAR = true,
  title,
  name,
  width,
  margin,
  dateFormat = "yyyy-MM-dd",
  value = new Date(),
  onChange = () => null,
  excludeDates = [],
}: StyledCalendarProps) => {
  if (COLUMN) {
    return (
      <Wrapper $column={COLUMN} $width={width} $margin={margin}>
        {title && <ColumnTitle>{title}</ColumnTitle>}
        <DateBox $arrow={ARROW} $calendar={CALENDAR} $column={COLUMN}>
          <DatePicker
            dateFormat={dateFormat}
            locale={ko as any}
            selected={value}
            onChange={onChange}
            excludeDates={excludeDates}
            renderCustomHeader={({
              monthDate,
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              decreaseYear,
              increaseYear,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
              prevYearButtonDisabled,
              nextYearButtonDisabled,
            }: ReactDatePickerCustomHeaderProps): React.ReactElement => {
              return (
                <CustomHeader
                  monthDate={monthDate}
                  date={date}
                  changeYear={changeYear}
                  changeMonth={changeMonth}
                  decreaseMonth={decreaseMonth}
                  increaseMonth={increaseMonth}
                  customHeaderCount={1}
                  decreaseYear={decreaseYear}
                  increaseYear={increaseYear}
                  prevMonthButtonDisabled={prevMonthButtonDisabled}
                  nextMonthButtonDisabled={nextMonthButtonDisabled}
                  prevYearButtonDisabled={prevYearButtonDisabled}
                  nextYearButtonDisabled={nextYearButtonDisabled}
                />
              );
            }}
          />
        </DateBox>
      </Wrapper>
    );
  }

  return (
    <Wrapper $width={width} $margin={margin}>
      {title && <RowTitle>{title} :</RowTitle>}
      <DateBox $arrow={ARROW}>
        <DatePicker
          dateFormat={dateFormat}
          locale={ko as any}
          selected={value}
          onChange={onChange}
          excludeDates={excludeDates}
          renderCustomHeader={({
            monthDate,
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
          }: ReactDatePickerCustomHeaderProps): React.ReactElement => {
            return (
              <CustomHeader
                monthDate={monthDate}
                date={date}
                changeYear={changeYear}
                changeMonth={changeMonth}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                customHeaderCount={1}
                decreaseYear={decreaseYear}
                increaseYear={increaseYear}
                prevMonthButtonDisabled={prevMonthButtonDisabled}
                nextMonthButtonDisabled={nextMonthButtonDisabled}
                prevYearButtonDisabled={prevYearButtonDisabled}
                nextYearButtonDisabled={nextYearButtonDisabled}
              />
            );
          }}
        />
      </DateBox>
    </Wrapper>
  );
};

export default memo(StyledCalendar);

const Wrapper = styled.div<{
  $column?: boolean;
  $width?: number;
  $margin?: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};

  ${({ $column }) =>
    $column &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `};
`;
const ColumnTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const RowTitle = styled.div`
  font-size: 14px;
  color: ${theme.colors.grayFontColor};
  margin-right: 12px;
  line-height: 1;
`;

const DateBox = styled.div<{
  $column?: boolean;
  $arrow?: boolean;
  $calendar?: boolean;
  $margin?: string;
}>`
  .react-datepicker {
    transform: translateX(-13px);
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
  .react-datepicker__triangle {
    position: absolute;
    left: 0px;
    transform: translate(207px, 0px);
  }
  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle {
    fill: ${theme.colors.blackColor};
    color: ${theme.colors.blackColor};
  }
  /* .react-datepicker-popper[data-placement^='bottom']
        .react-datepicker__triangle::after {
        border-bottom-color: ${theme.colors.blackColor};
    }
    .react-datepicker-popper[data-placement^='bottom']
        .react-datepicker__triangle::before {
        border: none;
    } */
  .react-datepicker__header {
    padding: 12px 0 8px;
    border-bottom: none;
    background-color: ${theme.colors.blackColor};
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
  }
  .react-datepicker__day-names {
    padding: 0 0.4rem;
    background-color: ${theme.colors.blackColor};
  }
  .react-datepicker__day-name {
    color: ${theme.colors.whiteColor};
  }

  .react-datepicker__day--selected {
    background-color: ${theme.colors.blackColor};
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker__navigation-icon::before {
    border-color: ${theme.colors.whiteColor};
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
