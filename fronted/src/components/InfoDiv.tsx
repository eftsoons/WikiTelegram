import { ReactNode } from "react";

export default ({
  text,
  icon,
  children,
}: {
  text: string;
  icon?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="info">
      <div className="info-headerinfo">
        <span>{text}</span> {icon && icon}
      </div>
      <div className="info-content">{children}</div>
    </div>
  );
};
