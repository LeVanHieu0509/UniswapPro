import moment, { isDate } from "moment";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { ButtonIcon } from "styles/buttons";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import {
  DatePickerContent,
  DatePickerHeader,
  DatePickerWrapper,
  DayButton,
  DaysWrapper,
  HeaderButton,
  MonthButton,
  MonthsWrapper,
  WeekTitleWrapper,
  WeekWrapper,
} from "./styled";

const weekTitle = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeekRender = ({
  date,
  month,
  value,
  minDate,
  maxDate,
  onChange,
}: {
  date: Date;
  month: number;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
}) => {
  const monday = moment(date).startOf("isoWeek");
  const week = [monday.toDate()];
  for (var i = 0; i < 6; i++) {
    week.push(monday.add(1, "day").toDate());
  }
  const disabled = (date: Date) => {
    if (minDate && date < minDate) {
      return true;
    }
    if (maxDate && date > maxDate) {
      return true;
    }
    return false;
  };
  return (
    <WeekWrapper>
      {week.map((date) => (
        <DayButton
          className="body-4"
          key={date.toJSON()}
          currentMonth={date.getMonth() === month}
          dateActive={value?.getTime() === date.getTime()}
          disabled={disabled(date)}
          onClick={() => {
            onChange(date);
          }}
        >
          <span className="body-4">{date.getDate()}</span>
        </DayButton>
      ))}
    </WeekWrapper>
  );
};

const MonthRender = ({
  year,
  month,
  onChange,
  value,
  minDate,
  maxDate,
}: {
  year: number;
  month: number;
  onChange: (date: Date) => void;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const date = moment([year, month]);
  const weeks = [];
  while (date.get("month") === month || date.startOf("isoWeek").get("month") === month) {
    weeks.push(
      <WeekRender
        value={value}
        key={date.startOf("isoWeek").format()}
        date={date.toDate()}
        month={month}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
    date.add(7, "day");
  }
  return <>{weeks}</>;
};

const DatePicker = ({
  value,
  minDate,
  maxDate,
  onChange,
}: {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
}) => {
  const theme = useTheme();
  const today = isDate(value) && moment(value).isValid() ? value : new Date();
  const [picker, setPicker] = useState("day");
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const handleChange = useCallback(
    (date: Date) => {
      onChange(date);
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    },
    // eslint-disable-next-line
    [month, year]
  );

  useEffect(() => {
    const date = isDate(value) && moment(value).isValid() ? value : new Date();
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [value]);

  return (
    <DatePickerWrapper>
      <DatePickerContent>
        <DatePickerHeader>
          <ButtonIcon
            onClick={() => {
              if (picker === "day") {
                let date = moment([year, month]).subtract(1, "month");
                setYear(date.get("year"));
                setMonth(date.get("month"));
              } else {
                setYear(year - 1);
              }
            }}
          >
            <ChevronLeft color={theme.color.status.primary} />
          </ButtonIcon>
          <HeaderButton
            onClick={() => {
              setPicker((pre) => (pre === "day" ? "month" : "day"));
            }}
          >
            <span className="body-3 primary-color">{picker === "day" ? `Tháng ${month + 1} năm ${year}` : year}</span>
          </HeaderButton>
          <ButtonIcon
            onClick={() => {
              if (picker === "day") {
                let date = moment([year, month]).add(1, "month");
                setYear(date.get("year"));
                setMonth(date.get("month"));
              } else {
                setYear(year + 1);
              }
            }}
          >
            <ChevronRight color={theme.color.status.primary} />
          </ButtonIcon>
        </DatePickerHeader>
        {picker === "day" ? (
          <DaysWrapper>
            <WeekTitleWrapper>
              {weekTitle.map((e, index) => (
                <span className="body-4" key={index}>
                  {e}
                </span>
              ))}
            </WeekTitleWrapper>
            <MonthRender
              minDate={minDate}
              maxDate={maxDate}
              year={year}
              month={month}
              value={value}
              onChange={handleChange}
            />
          </DaysWrapper>
        ) : (
          <MonthsWrapper>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
              <MonthButton
                key={m}
                dateActive={month === m}
                onClick={() => {
                  setMonth(m);
                  setPicker("day");
                }}
              >
                <span className="body-4">{`Tháng ${m + 1}`}</span>
              </MonthButton>
            ))}
          </MonthsWrapper>
        )}
      </DatePickerContent>
    </DatePickerWrapper>
  );
};

export default DatePicker;
