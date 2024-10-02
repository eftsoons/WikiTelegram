export default ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => {
  return (
    <button className="buttontile" onClick={onClick}>
      {children}
    </button>
  );
};
