import { CSSProperties, ReactNode, MouseEvent } from "react";

const Button = ({
  onClick,
  className,
  onClickGroup,
  index,
  children,
  style,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickGroup?: (index: number) => void;
  className?: string;
  index?: number;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <button
      style={style}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
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

export default Button;
