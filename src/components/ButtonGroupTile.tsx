import { CSSProperties, ReactNode } from "react";

export default ({
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
