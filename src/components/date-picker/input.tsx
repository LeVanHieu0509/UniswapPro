import { Error } from "components/dropdown-fieldset/styled";
import { FieldSetWrapper, Label } from "components/input-fileldset/styled";
import useClickAway from "hooks/use-click-away";
import { isEmpty } from "lodash";
import moment from "moment";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { FieldSet } from "styles";
import { ButtonIcon } from "styles/buttons";
import DatePicker from ".";
import IconCalendar from "./calendar";
import { DatePickerAbsoluteWrapper, InputMask, InputWrapper, WrapperInputContent } from "./styled";

interface InputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  name?: string;
  rightAbs?: boolean; //position datePicker => right
  onBlur?: () => void;
  onKeyDown?: () => void;
  onChange?: (date: string) => void;
  onChangeError?: (error: string) => void;
}

const DateInput = ({
  onChange,
  onBlur,
  value,
  placeholder,
  readOnly,
  onKeyDown,
  disabled,
  required,
  error,
  name,
  rightAbs = false,
}: InputProps) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>();

  const [shownPicker, setShownPicker] = useState(false);
  const place = placeholder || moment(new Date()).format("DD/MM/YYYY");
  const [focus, setFocus] = useState(false);

  useClickAway(ref, () => {
    setShownPicker(false);
  });

  const dateValue = useMemo(() => {
    return moment(value, "DD/MM/YYYY", true).toDate();
  }, [value]);

  const onSelectDate = (value: any) => {
    if (typeof onChange === "function") {
      onChange(value);
    }
    setShownPicker(false);
  };

  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value) {
      onSelectDate("");
      return;
    }
    let num = value.replace(/[^0-9]/g, "") + "";
    let newStr = "";

    const max = Math.min(num.length, 8);

    for (let i = 0; i < max; i++) {
      newStr += num[i];
      if ((i === 1 || i === 3) && i !== max - 1) {
        newStr += "/";
      }
    }
    var [day, month, year] = newStr.split("/");
    const y = parseInt(year);
    const m = parseInt(month);
    if (parseInt(day) > 31) {
      day = "31";
    }
    if (day === "00") {
      day = "01";
    }
    if (month && parseInt(month) > 12) {
      month = "12";
    }
    if (month === "00") {
      month = "01";
    }
    if (year?.length === 4) {
      if ((y % 4 === 0 && y % 100 !== 0 && y % 400 !== 0) || (y % 100 === 0 && y % 400 === 0)) {
        if (month === "02" && parseInt(day) > 29) {
          day = "29";
        }
      } else if (month === "02" && parseInt(day) > 28) {
        day = "28";
      }
    }
    if ([4, 6, 9, 11].includes(m) && parseInt(day) > 30) {
      day = "30";
    }
    function formatString(value: string = "", length: number = 2) {
      return `${value}____`.slice(0, length);
    }
    newStr = [formatString(day), formatString(month), formatString(year, 4)].join("/");
    onSelectDate(newStr);
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <FieldSetWrapper mbMargin={placeholder ? 8 : 0}>
      <InputWrapper ref={ref}>
        <FieldSet active={focus} error={error}>
          <Label focus={focus} disabled={disabled} required={required} haveValue={!isEmpty(value)}>
            {place}
          </Label>
          <WrapperInputContent disabled={disabled}>
            <InputMask
              name={name}
              onChange={!readOnly ? changeDate : null}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value || ""}
              // placeholder={place + (required ? " *" : "")}
              format="##/##/####"
              onKeyDown={onKeyDown}
              disabled={disabled}
              mask={"_"}
            />
            <ButtonIcon
              disabled={disabled}
              onClick={
                disabled
                  ? null
                  : () => {
                      setShownPicker(true);
                    }
              }
            >
              <IconCalendar size={24} color={disabled ? theme.color.text.disabled : theme.color.status.primary} />
            </ButtonIcon>
          </WrapperInputContent>
        </FieldSet>

        {shownPicker && (
          <DatePickerAbsoluteWrapper rightAbs={rightAbs}>
            <DatePicker
              value={dateValue}
              minDate={name === "appointmentdate" ? new Date() : null}
              maxDate={name === "appointmentdate" ? moment(new Date(), "DD/MM/YYYY").add(60, "d").toDate() : null}
              onChange={(date: Date) => {
                onSelectDate(moment(date).format("DD/MM/YYYY"));
              }}
            />
          </DatePickerAbsoluteWrapper>
        )}
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
    </FieldSetWrapper>
  );
};

export default DateInput;
