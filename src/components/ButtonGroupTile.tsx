import { CSSProperties, ReactNode } from "react";

const ButtonGroupTile = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div className="buttontilegroup" style={style}>
      {children}
    </div>
  );
};

export default ButtonGroupTile;
