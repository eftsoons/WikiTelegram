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

      scrollContainer.addEventListener("wheel", handlescroll);

      return () => scrollContainer.removeEventListener("wheel", handlescroll);
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
