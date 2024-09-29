import { ReactNode } from "react";

export default ({
  before,
  header,
  text,
  disabled,
  after,
  colorafter,
  onClick,
  type,
}: {
  before: ReactNode;
  header: ReactNode;
  text: string;
  disabled?: boolean;
  after?: string;
  colorafter?: string;
  onClick?: () => void;
  type?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="cell"
      style={{ opacity: disabled ? "0.3" : "1" }}
    >
      <div className="cell-before">{before}</div>
      <div
        className="cell-main"
        style={{ height: type == "big" ? "128px" : "64px" }}
      >
        <div className="cell-header">
          <div className="cell-header-span">{header}</div>
          {after && colorafter && (
            <div
              className="call-header-after"
              style={{ color: colorafter, borderColor: colorafter }}
            >
              {after}
            </div>
          )}
        </div>
        <div className="cell-span">{text}</div>
      </div>
    </div>
  );
};
