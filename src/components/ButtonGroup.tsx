import { ReactElement, cloneElement, useEffect, useRef } from "react";
import Button from "./Button";

const ButtonGroup = ({
  children,
  active,
  setbuttonactive,
  editor,
  editoronClick,
  onClick,
}: {
  children: ReactElement[];
  active: number;
  setbuttonactive: Function;
  editor: boolean;
  editoronClick?: () => void;
  onClick?: () => void;
}) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current as Element;

      if (scrollContainer) {
        const handlescroll: EventListener = (e) => {
          const wheelEvent = e as WheelEvent;

          wheelEvent.preventDefault();

          scrollContainer.scrollLeft += wheelEvent.deltaY > 0 ? 50 : -50;

          //console.log(scrollContainer.scrollLeft);

          //scrollContainer.scrollLeft += wheelEvent.deltaY;

          /*scrollContainer.scrollTo({
            left: test + (wheelEvent.deltaY > 0 ? 25 : -25),
            behavior: "smooth", // Плавная прокрутка
          });*/
        };

        let startX: number;

        const handleTouchStart: EventListener = (e) => {
          const touchEvent = e as TouchEvent;
          startX = touchEvent.touches[0].clientX;
        };

        const handleTouchMove: EventListener = (e) => {
          const touchEvent = e as TouchEvent;
          const moveX = touchEvent.touches[0].clientX - startX;

          scrollContainer.scrollLeft -= moveX;

          startX = touchEvent.touches[0].clientX;
        };

        scrollContainer.addEventListener("wheel", handlescroll);

        scrollContainer.addEventListener("touchstart", handleTouchStart);

        scrollContainer.addEventListener("touchmove", handleTouchMove);

        return () => {
          scrollContainer.removeEventListener("wheel", handlescroll);
          scrollContainer.removeEventListener("touchstart", handleTouchStart);
          scrollContainer.removeEventListener("touchmove", handlescroll);
        };
      }
    }
  }, [scrollContainerRef]);

  return (
    <div onClick={onClick} ref={scrollContainerRef} className="button-group">
      {children &&
        children.map((data, index) => {
          return cloneElement(data, {
            className: active == index ? "button active" : "button",
            onClickGroup: (e: number) => {
              if (scrollContainerRef.current) {
                const scrollContainer = scrollContainerRef.current as Element;

                setbuttonactive(e);
                if (scrollContainer) {
                  scrollContainer.scrollTo({
                    left: e * 100,
                    behavior: "smooth",
                  });
                }
              }
            },
            key: index,
            index: index,
          });
        })}
      {editor && <Button onClick={editoronClick}>ADD</Button>}
    </div>
  );
};

export default ButtonGroup;
