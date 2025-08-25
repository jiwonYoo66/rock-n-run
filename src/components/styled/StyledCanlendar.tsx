import React, { ChangeEvent, memo, useEffect, useState, JSX } from "react";
import styled, { css } from "styled-components";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ko } from "date-fns/locale/ko";
import { getYear, getMonth } from "date-fns";
import { getYearOption } from "@utils/commons";
import theme from "@styles/theme";

type StyledCalendarProps = {
  ROW?: boolean;
  title?: string;
  width?: string | number;
  margin?: string;
  dateFormat?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  excludeDates?: Date[];
  placeholder?: string;
  disabled?: boolean;
  yearOption?: string[] | number[];
};

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  yearOption,
}: ReactDatePickerCustomHeaderProps & { yearOption?: string[] | number[] }) => {
  const [years, setYears] = useState(getYearOption());
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

  useEffect(() => {
    if (yearOption) {
      setYears(yearOption);
    }
  }, [yearOption]);

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
  ROW,
  title,
  width,
  margin,
  dateFormat = "yyyy-MM-dd",
  value = new Date(),
  onChange,
  excludeDates = [],
  placeholder,
  disabled,
  yearOption,
}: StyledCalendarProps) => {
  if (ROW) {
    return (
      <Wrapper $width={width} $margin={margin}>
        {title && <RowTitle>{title}</RowTitle>}
        <DateBox>
          <DatePicker
            dateFormat={dateFormat}
            locale={ko}
            selected={value}
            onChange={onChange}
            excludeDates={excludeDates}
            disabled={disabled}
            // includeDates={includeDates.map(date => new Date(date))}
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
            }: ReactDatePickerCustomHeaderProps): JSX.Element => {
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
                  yearOption={yearOption}
                />
              );
            }}
          />
        </DateBox>
      </Wrapper>
    );
  }

  return (
    <Wrapper $row={ROW} $width={width} $margin={margin}>
      {title && <ColumnTitle>{title}</ColumnTitle>}
      <DateBox $row={ROW}>
        <DatePicker
          dateFormat={dateFormat}
          locale={ko}
          selected={value}
          onChange={onChange}
          excludeDates={excludeDates}
          placeholderText={placeholder}
          disabled={disabled}
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
          }: ReactDatePickerCustomHeaderProps): JSX.Element => {
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
                yearOption={yearOption}
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
  $row?: boolean;
  $width?: string | number;
  $margin?: string;
}>`
  width: ${({ $width }) => ($width ? $width : "auto")};
  font-family: PretendardRegular, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${({ $margin }) => ($margin ? $margin : 0)};

  ${({ $row }) =>
    $row &&
    css`
      flex-direction: row;
      align-items: center;
    `};
`;
const ColumnTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const RowTitle = styled.div`
  font-size: 14px;
  margin-right: 12px;
`;
const DateBox = styled.div<{ $row?: boolean; $margin?: string }>`
  width: 100%;
  height: 48px;
  position: relative;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
    height: 100%;
  }

  .react-datepicker {
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }

  .react-datepicker-popper .react-datepicker__triangle {
    stroke: ${theme.colors.activeIndigo};
    fill: ${theme.colors.activeIndigo};
    color: ${theme.colors.activeIndigo};
  }

  .react-datepicker__header {
    padding: 12px 0 8px;
    border-bottom: none;
    background-color: ${theme.colors.activeIndigo};
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
  }

  .react-datepicker__day-name {
    color: ${theme.colors.whiteColor};
  }

  .react-datepicker__day--selected {
    background-color: ${theme.colors.activeIndigo};
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
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.lightGrayBorderColor};
    cursor: pointer;
    background-image: url("/selectArrowDown.svg");
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: top 50% right 12px;

    &:focus {
      border: 1px solid ${theme.colors.blackColor};
    }

    &::placeholder {
      color: ${theme.colors.deepGrayFontColor};
    }
  }
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
  background-image: url("/selectArrowDown.svg");
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: right 6px top 52%;

  &:nth-child(1) {
    width: 48px;
  }
`;
