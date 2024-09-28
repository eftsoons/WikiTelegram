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
      const handlescroll = (event: any) => {
        //WheelEvent не работает
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY > 0 ? 50 : -50;
      };

      let startX: number;

      const handleTouchStart = (e: any) => {
        console.log(123);
        startX = e.touches[0].clientX;
      };

      const handleTouchMove = (e: any) => {
        const moveX = e.touches[0].clientX - startX;

        scrollContainer.scrollLeft += moveX > 0 ? 50 : -50;
        startX = 0;
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
              setbuttonactive(e);
              if (scrollContainer) {
                /*scrollContainer.scrollTo({
                  left: e * 100,
                  behavior: "smooth",
                });*/
              }
            },
            key: index,
            index: index,
          });
        })}
    </div>
  );
};
