import { ReactElement, cloneElement, useEffect } from "react";

export default ({
  children,
  active,
  setbuttonactive,
}: {
  children: ReactElement[];
  active: number;
  setbuttonactive: Function;
}) => {
  const scrollContainer = document.querySelector(".button-group");

  useEffect(() => {
    if (scrollContainer) {
      const handlescroll: EventListener = (e) => {
        const wheelEvent = e as WheelEvent;

        wheelEvent.preventDefault();
        scrollContainer.scrollLeft += wheelEvent.deltaY > 0 ? 50 : -50;
      };

      let startX: number;

      const handleTouchStart: EventListener = (e) => {
        const touchEvent = e as TouchEvent;

        touchEvent.preventDefault();
        startX = touchEvent.touches[0].clientX;
      };

      const handleTouchMove: EventListener = (e) => {
        const touchEvent = e as TouchEvent;

        touchEvent.preventDefault();
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
  }, [scrollContainer]);

  return (
    <div key={0} className="button-group">
      {children &&
        children.map((data, index) => {
          return cloneElement(data, {
            className: active == index ? "button active" : "button",
            onClickGroup: (e: number) => {
              console.log(data);
              setbuttonactive(e);
              if (scrollContainer) {
                scrollContainer.scrollTo({
                  left: e * 100,
                  behavior: "smooth",
                });
              }
            },
            key: index,
            index: index,
          });
        })}
    </div>
  );
};
