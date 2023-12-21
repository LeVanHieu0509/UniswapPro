import ChevronLeft from "components/date-picker/chevron-left";
import ChevronRight from "components/date-picker/chevron-right";
import { cloneDeep } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { BannerSlideWrapper, ButtonIconLeft, ButtonIconRight, PlanMobile, SlideWrapper } from "./styled";

const CardSlide = ({ type, col, background, length, children, showDot = true }: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [transition, setTransition] = useState(true);
  const [positionTouch, setPositionTouch] = useState<any>();

  const size = length - 1;

  const handlePre = useCallback(() => {
    setTransition(true);
    if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(size);

      setTimeout(() => {
        setTransition(true);
        setCurrentIndex(size - 1);
      }, 100);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setTransition(true);
    if (currentIndex === size - 1) {
      setCurrentIndex(size);

      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(0);
      }, 300);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  const handleTouchStart = useCallback((e) => {
    setPositionTouch(e.touches[0].pageX);
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!e.cancelable || e.changedTouches[0].pageX === positionTouch) {
        return;
      }
      if (e.changedTouches[0].pageX < positionTouch && currentIndex <= size - col && !type) {
        handleNext();
      }
      if (e.changedTouches[0].pageX >= positionTouch && currentIndex !== 0 && !type) {
        handlePre();
      }
    },
    [positionTouch]
  );

  const transform = useMemo(() => {
    let c: any = cloneDeep(currentIndex);
    let a: any = (c * 100).toFixed(2);
    return a / col;
  }, [currentIndex]);

  const disableBtn = useMemo(() => (length == 0 ? true : false), [length]);

  return (
    <BannerSlideWrapper type={type}>
      <PlanMobile>
        {/* <ButtonIconLeft hide={disableBtn} col={col} onClick={handlePre}>
          <ChevronLeft color="#E87722" />
        </ButtonIconLeft> */}

        <SlideWrapper
          style={{
            transform: `translateX(-${transform}%)`,
            transition: transition ? "all 0.4s ease-in-out" : "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </SlideWrapper>

        {/* <ButtonIconRight hide={disableBtn} onClick={handleNext}>
          <ChevronRight color="#E87722" />
        </ButtonIconRight> */}
      </PlanMobile>
    </BannerSlideWrapper>
  );
};

export default CardSlide;
