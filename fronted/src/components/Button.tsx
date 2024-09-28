export default ({
  onClick,
  className,
  onClickGroup,
  index,
  children,
}: {
  onClick?: () => void;
  onClickGroup?: (index: number) => void;
  className?: string;
  index?: number;
  children?: string;
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }

        if (onClickGroup && (index || index == 0)) {
          onClickGroup(index);
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
};
