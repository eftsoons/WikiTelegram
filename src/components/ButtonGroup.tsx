import { ReactElement, cloneElement, useEffect, useRef } from "react";

export default ({
  children,
  active,
  setbuttonactive,
}: {
  children: ReactElement[];
  active: number;
  setbuttonactive: Function;
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
    <div ref={scrollContainerRef} className="button-group">
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
    </div>
  );
};
