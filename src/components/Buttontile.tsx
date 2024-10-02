import { ReactNode } from "react";

export default ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button className="buttontile" onClick={onClick}>
      {children}
    </button>
  );
};
