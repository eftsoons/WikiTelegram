import { CSSProperties } from "react";

const Border = ({ type, style }: { type?: string; style?: CSSProperties }) => {
  return (
    <div
      className="main-border"
      style={{ justifyContent: type == "center" ? "center" : "end", ...style }}
    >
      <div className="border" />
    </div>
  );
};

export default Border;
