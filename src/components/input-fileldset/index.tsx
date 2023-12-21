import { isEmpty, isNil } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { NumberFormatValues, NumericFormat, PatternFormat } from "react-number-format";
import { Error, FieldSetWrapper, Input, InputLeft, InputWrapper, Label, TextArea, Warning } from "./styled";
import PulseLoader from "components/loading/pulse-loader";

interface InputFieldSetProps {
  placeholder?: string;
  type?: string;
  value: string | number;
  name?: string;
  size?: number;
  required?: boolean;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  isuppercase?: boolean;
  readOnly?: boolean;
  error?: string | boolean;
  suffix?: string;
  onClear?(): void;
  onChange?(e: { target: { value: string } }): void;
  onKeyUp?(e: { key: string }): void;
  onBlur?(): void;
  numberFormat?: boolean;
  pattenFormat?: boolean;
  warning?: string;
  extend?: React.ReactNode;
  maxLength?: number;
  mask?: string;
  format?: string;
  hidden?: boolean;
  onKeyDown?: any;
  loading?: boolean;
  className?: string;
  autofocus?: boolean;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

function InputFieldSet({
  id,
  name,
  type = "text",
  onChange,
  onBlur,
  value,
  placeholder,
  disabled,
  readOnly = false,
  isuppercase = false,
  required = false,
  numberFormat,
  pattenFormat,
  error,
  warning,
  extend,
  maxLength,
  format,
  mask,
  size,
  onKeyDown,
  onKeyUp,
  suffix,
  loading,
  autofocus,
  className,
  leftIcon,
  rightIcon,
  hidden = false,
}: InputFieldSetProps) {
  const [focus, setFocus] = useState(false);
  const refInput = useRef(null);

  const [autoComplete, setAutoComplete] = useState(false);

  useEffect(() => {
    const handel = () => {
      setFocus(true);
    };
    var i = 10;
    const interval = setInterval(() => {
      try {
        i--;
        if (refInput.current.matches(":-internal-autofill-selected")) {
          setAutoComplete(true);
          clearInterval(interval);
        }
        if (i == 0) {
          clearInterval(interval);
        }
      } catch (_) {}
    }, 300);
    refInput.current?.addEventListener?.("focus", handel);
    return () => {
      refInput.current?.removeEventListener?.("focus", handel);
    };
  }, []);

  const handleBlur = () => {
    onChange?.({ target: { value: value?.toString() || "" } });
    setFocus(false);
    onBlur?.();
  };

  return (
    <FieldSetWrapper mbMargin={placeholder ? 8 : 0}>
      <InputWrapper active={focus} error={!!error} hidden={hidden}>
        {leftIcon && <InputLeft>{leftIcon}</InputLeft>}
        {loading ? (
          <PulseLoader loading />
        ) : (
          <>
            {numberFormat ? (
              <NumericFormat
                customInput={Input}
                id={id}
                name={name}
                value={value ?? ""}
                disabled={disabled}
                getInputRef={(current: HTMLInputElement) => {
                  refInput.current = current;
                }}
                onBlur={handleBlur}
                readOnly={disabled || readOnly}
                displayType={"input"}
                className={className}
                allowNegative={false}
                autoComplete="off"
                suffix={suffix}
                onValueChange={(e: NumberFormatValues) => {
                  onChange?.({ target: { value: e.value } });
                }}
                onInput={() => setAutoComplete(false)}
                pattern={format}
                style={{ height: (size || 48) + "px" }}
                decimalSeparator=","
                thousandSeparator="."
                maxLength={maxLength}
              />
            ) : pattenFormat ? (
              <PatternFormat
                customInput={Input}
                id={id}
                name={name}
                value={value ?? ""}
                disabled={disabled}
                getInputRef={(current: HTMLInputElement) => {
                  refInput.current = current;
                }}
                onBlur={handleBlur}
                readOnly={disabled || readOnly}
                displayType={"input"}
                className={className}
                autoComplete="off"
                suffix={suffix}
                onValueChange={(e: NumberFormatValues) => {
                  onChange?.({ target: { value: e.value } });
                }}
                onInput={() => setAutoComplete(false)}
                style={{ height: (size || 48) + "px" }}
                maxLength={maxLength}
                format={format}
              />
            ) : type === "textarea" ? (
              <TextArea
                id={id}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                ref={refInput}
                onBlur={handleBlur}
                readOnly={disabled || readOnly}
                maxLength={maxLength}
                className={className}
                autoComplete="off"
                onInput={() => setAutoComplete(false)}
              />
            ) : (
              <Input
                // pattern="[A-Za-z0-9]"
                onKeyDown={onKeyDown}
                id={id}
                name={name}
                type={type}
                autoFocus={autofocus}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                ref={refInput}
                onBlur={handleBlur}
                readOnly={disabled || readOnly}
                maxLength={maxLength}
                autoComplete="off"
                size={size}
                onKeyUp={onKeyUp}
                className={className}
                onInput={() => setAutoComplete(false)}
                style={leftIcon ? { paddingLeft: 36 } : undefined}
              />
            )}
          </>
        )}

        {placeholder && (
          <Label
            htmlFor={id}
            focus={focus}
            required={required}
            type={type}
            disabled={disabled}
            haveValue={autoComplete || (!isEmpty(`${value}`) && !isNil(value))}
            style={leftIcon && !focus ? { paddingLeft: 28 } : undefined}
          >
            {placeholder}
            {required && <span className="danger">*</span>}
          </Label>
        )}
        {rightIcon}
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
      {warning ? <Warning>{warning}</Warning> : null}
      {extend}
    </FieldSetWrapper>
  );
}

export default InputFieldSet;
