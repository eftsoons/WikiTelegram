import { CSSProperties, ReactNode } from "react";

export default ({
  children,
  style,
}: {
  children: ReactNode[];
  style?: CSSProperties;
}) => {
  /*<div className="normal-block-title">{title}</div>
  <div className="normal-block-img"></div>
  <div className="normal-block-text">{children}</div>*/

  return (
    <div style={style} className="normal-block">
      {children}
    </div>
  );
};
