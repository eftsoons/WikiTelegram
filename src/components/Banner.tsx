import { ReactNode } from "react";

export default ({
  children,
  description,
  backgroundColor,
}: {
  children: ReactNode;
  description?: ReactNode;
  backgroundColor?: string;
  subdescription?: ReactNode;
}) => {
  return (
    <div className="banner" style={{ backgroundColor: backgroundColor }}>
      <div className="banner-block">{children}</div>
      <div className="banner-description">{description}</div>
    </div>
  );
};
