import { CSSProperties } from "react";

export default ({
  onClick,
  className,
  onClickGroup,
  index,
  children,
  style,
}: {
  onClick?: () => void;
  onClickGroup?: (index: number) => void;
  className?: string;
  index?: number;
  children?: string;
  style?: CSSProperties;
}) => {
  return (
    <button
      style={style}
      onClick={() => {
        if (onClick) {
          onClick();
        }

        if (onClickGroup && (index || index == 0)) {
          onClickGroup(index);
        }
      }}
      className={className ? className : "button"}
    >
      {children}
    </button>
  );
};
