import { CSSProperties } from "react";
import icons from "../icon";

export type Icon = keyof typeof icons;

const Icon = (iconname: Icon, size?: string, style?: CSSProperties) => {
  return (
    <span
      className="icon"
      style={size ? { fontSize: `${size}rem`, ...style } : { ...style }}
    >
      {String.fromCharCode(parseInt(icons[iconname], 16))}
    </span>
  );
};

export default Icon;
