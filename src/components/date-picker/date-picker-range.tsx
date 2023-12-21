import Icons from "components/icons";
import { Error, FieldSetWrapper, Label } from "components/input-fileldset/styled";
import useClickAway from "hooks/use-click-away";
import { isEmpty } from "lodash";
import moment from "moment";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { FieldSet } from "styles";
import { ButtonIcon } from "styles/buttons";
import DatePicker from ".";
import { DatePickerAbsoluteWrapper, InputWrapper, WrapperInputContent } from "./styled";
import IconCalendar from "./calendar";

interface InputProps {
  valueFrom?: string;
  valueTo?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  name?: string;
  onChangeFrom?: (date: string) => void;
  onChangeTo?: (date: string) => void;
}

const DatePickerRange = ({
  onChangeFrom,
  onChangeTo,
  valueFrom,
  valueTo,
  placeholder,
  readOnly,
  disabled,
  required,
  error,
  name,
}: InputProps) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>();

  const [shownPicker, setShownPicker] = useState(false);
  const place = placeholder || moment(new Date()).format("DD/MM/YYYY");
  const [focus, setFocus] = useState(false);

  useClickAway(ref, () => {
    setShownPicker(false);
  });

  const dateValueFrom = useMemo(() => {
    return moment(valueFrom, "DD/MM/YYYY").toDate();
  }, [valueFrom]);

  const dateValueTo = useMemo(() => {
    return moment(valueTo, "DD/MM/YYYY").toDate();
  }, [valueTo]);

  const onSelectDateFrom = (value: any) => {
    onChangeFrom?.(value);
    // setShownPicker(false);
  };

  const onSelectDateTo = (value: any) => {
    onChangeTo?.(value);
    // setShownPicker(false);
  };

  return (
    <FieldSetWrapper mbMargin={placeholder ? 8 : 0}>
      <InputWrapper ref={ref}>
        <FieldSet active={focus} error={error}>
          <Label focus={focus} disabled={disabled} required={required} haveValue={!isEmpty(valueFrom)}>
            {place}
            {required && <span>*</span>}
          </Label>
          <WrapperInputContent disabled={disabled}>
            <span>
              {valueFrom ?? "-"} - {valueTo ?? "-"}
            </span>
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
              <IconCalendar size={30} color={disabled ? theme.color.text.disabled : theme.color.status.primary} />
            </ButtonIcon>
          </WrapperInputContent>
        </FieldSet>

        {shownPicker && (
          <DatePickerAbsoluteWrapper isDouble>
            <DatePicker
              value={dateValueFrom}
              onChange={(date: Date) => {
                onSelectDateFrom(moment(date).format("DD/MM/YYYY"));
              }}
              maxDate={new Date() > dateValueTo ? dateValueTo : new Date()}
              // minDate={moment().subtract(90, "d").toDate()}
            />
            <DatePicker
              value={dateValueTo}
              onChange={(date: Date) => {
                onSelectDateTo(moment(date).format("DD/MM/YYYY"));
              }}
              minDate={dateValueFrom}
              maxDate={new Date()}
            />
          </DatePickerAbsoluteWrapper>
        )}
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
    </FieldSetWrapper>
  );
};

export default DatePickerRange;
