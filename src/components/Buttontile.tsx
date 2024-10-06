import { ReactNode } from "react";

const ButtonTille = ({
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

export default ButtonTille;
