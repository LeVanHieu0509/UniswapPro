import Icons from "components/icons";
import PulseLoader from "components/loading/pulse-loader";
import useClickAway from "hooks/use-click-away";
import { isEmpty, isNil } from "lodash";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Label } from "styles/input-styled";
import { removeVietnameseTones } from "utils";
import { DropDownFiled, DropDownWrapper, Error, List, ListWrapper } from "./styled";
import { Flex } from "styles/common";
import Empty from "components/empty";

interface Option {
  value: string;
  label: string;
  extra?: any;
}

interface DropDownProps {
  list?: Option[];
  title?: any;
  value?: string | number;
  error?: string | boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  sizeIcon?: number;
  canRemove?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onChange?(value: string, option: Option): void;
  onReset?(): void;
  onBlur?(): void;
  loading?: boolean;
  isSearch?: boolean;
  isChildren?: boolean;
  setSearchText?: any;
  children?: React.ReactNode | React.ReactNode[];
}

function DropDown({
  id,
  name,
  list = [],
  title,
  value,
  error,
  disabled,
  required = false,
  canRemove,
  size,
  showText,
  onChange,
  loading,
  onBlur,
  isSearch,
  children,
  isChildren = false,
  setSearchText,
  ...props
}: DropDownProps) {
  const [show, setShow] = useState(false);
  const [indexFocus, setIndexFocus] = useState(-1);
  const ref = useRef<HTMLDivElement>();
  const refButton = useRef<HTMLDivElement>();

  const [focusButton, setFocusButton] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const refSelect = useRef<HTMLSelectElement>();
  const [text, setText] = useState<string | number>();

  const [searchKey, setSearchKey] = useState("");
  const [isFocus, setFocus] = useState(false);

  //need optimize
  useEffect(() => {
    if (showText && !list.find((item) => item.value === value)) {
      setText(value);
    } else {
      setText(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const handle = () => {
      setFocusButton(true);
    };
    if (refButton.current) {
      refButton.current?.addEventListener("focus", handle);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refButton.current?.removeEventListener("focus", handle);
      }
    };
  }, []);

  useClickAway(ref, (e: Event) => {
    setShow(false);
    setFocusButton(false);
    onBlur?.();
  });

  useEffect(() => {
    setSearchKey("");
  }, [value]);

  const handleKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setShow(true);
        setIndexFocus((pre) => {
          return pre < list.length - 1 ? pre + 1 : list.length - 1;
        });
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setIndexFocus((pre) => {
          return pre > 0 ? pre - 1 : 0;
        });
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (refButton.current) {
          refButton.current.blur();
        }
        setShow(false);
        indexFocus != -1 && onChange?.(list[indexFocus].value, list[indexFocus]);
        break;
      }
      case "Tab": {
        if (e.shiftKey) {
          setIndexFocus((pre) => {
            return pre > 0 ? pre - 1 : 0;
          });
        } else {
          setIndexFocus((pre) => {
            return pre < list.length - 1 ? pre + 1 : list.length - 1;
          });
        }
        break;
      }
    }
  };

  useEffect(() => {
    if (indexFocus >= 0 && ref.current) {
      const element: HTMLElement = ref.current.children[indexFocus] as HTMLElement;
      // const scrollTop = element?.offsetTop;
      element?.focus?.();
      // ref.current.scrollTo({ top: scrollTop, left: 0 });
    }
  }, [indexFocus]);

  const onSelectItem = (value: string, item: Option) => {
    setShow(false);
    onChange?.(value, item);
    setIndexFocus(-1);
    // document.body.style.overflow = "unset";
    setAutoComplete(false);
    // setTimeout(() => {
    //   refSelect.current?.blur();
    // }, 100);
  };

  const onShowList = () => {
    if (!loading) {
      setShow(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      try {
        if (refSelect.current?.matches(":-internal-autofill-selected")) {
          setAutoComplete(true);
        }
      } catch (_) {}
    }, 300);
  }, []);

  const selectedLabel = text ? value : value && list?.find((e) => e.value === value)?.label;

  return (
    <DropDownWrapper>
      <DropDownFiled
        ref={refButton}
        size={size}
        active={focusButton}
        tabIndex={0}
        onBlur={() => {
          setFocusButton(false);
        }}
        onKeyDown={() => handleKeydown}
        onClick={onShowList}
        onFocus={(e) => {
          e.preventDefault();
          setIndexFocus(-1);
        }}
        disabled={disabled}
        error={!!error}
      >
        {/* {loading ? (
          <Flex className="w-full h-full" justify="center" align="center">
            <PulseLoader loading />
          </Flex>
        ) : ( */}
        <>
          {title && (
            <Label
              focus={focusButton}
              required={required}
              type={"dropdown"}
              haveValue={autoComplete || (!isEmpty(`${value}`) && !isNil(value)) || isFocus}
            >
              {title}
              {required && <span className="red-color">*</span>}
            </Label>
          )}
          {isSearch ? (
            <input
              placeholder="Nhập tên, mã vạch, hoặc mã code..."
              style={{ padding: "7px 10px", width: "100%" }}
              value={value}
              onChange={(e) => {
                // setSearchKey(e.target.value);
                setSearchText(e.target.value);
              }}
              // placeholder={selectedLabel.toString()}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
              }}
            />
          ) : (
            <p className={value ? "value" : null}>{selectedLabel}</p>
          )}
        </>
        {/* )} */}
        <Icons icon="search-input" size={12} color={`${disabled ? "#ADADAD" : "#E87722"}`} />
        {typeof error === "string" && <Error>{error}</Error>}
      </DropDownFiled>

      {!isChildren && show && !disabled && (
        // <Portal id="">
        <ListWrapper ref={ref} onClick={() => setShow(false)}>
          <List>
            {list
              .filter(
                (a) =>
                  !searchKey ||
                  removeVietnameseTones(a.label?.toLowerCase()).includes(removeVietnameseTones(searchKey.toLowerCase()))
              )
              .map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      onSelectItem(item.value, item);
                    }}
                    onKeyDown={handleKeydown}
                    className={value === item.value || indexFocus === index ? "primary-color" : ""}
                  >
                    <span className={value === item.value || indexFocus === index ? "primary-color" : ""}>
                      {item.label}
                    </span>
                  </button>
                </div>
              ))}
            {list?.length === 0 && <Empty text="Không có dữ liệu" />}
          </List>
        </ListWrapper>
        // </Portal>
      )}

      {isChildren && show && !disabled && (
        // <Portal id="">
        <ListWrapper ref={ref} onClick={() => setShow(false)}>
          <List>{children}</List>
        </ListWrapper>
        // </Portal>
      )}
    </DropDownWrapper>
  );
}

export default DropDown;
