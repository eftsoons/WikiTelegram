import { CSSProperties } from "react";
import icons from "../icon";

export type Icon = keyof typeof icons;

export default (iconname: Icon, size?: string, style?: CSSProperties) => {
  return (
    <span
      className="icon"
      style={size ? { fontSize: `${size}rem`, ...style } : { ...style }}
    >
      {String.fromCharCode(parseInt(icons[iconname], 16))}
    </span>
  );
};
