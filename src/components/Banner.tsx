import { CSSProperties, ReactNode } from "react";

const Banner = ({
  children,
  description,
  backgroundColor,
  backgroundImage,
  onClick,
  style,
}: {
  children?: ReactNode;
  description?: ReactNode;
  backgroundColor?: string;
  subdescription?: ReactNode;
  backgroundImage?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) => {
  return (
    <div
      className="banner"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : "",
        ...style,
      }}
      onClick={onClick}
    >
      <div className="banner-block">{children}</div>
      <div className="banner-description">{description}</div>
    </div>
  );
};

export default Banner;
