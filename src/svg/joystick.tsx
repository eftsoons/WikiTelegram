export default ({
  onClick,
  height,
  width,
}: {
  onClick?: () => void;
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      width={width ? width : "48"}
      height={height ? height : "64"}
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M27 22.9062C32.1768 21.6143 36 17.0589 36 11.6364C36 5.20952 30.627 0 24 0C17.373 0 12 5.20952 12 11.6364C12 17.0589 15.8232 21.6143 21 22.9062V43.6364H12V49.4545H3C2.00684 49.4545 1.12793 49.9205 0.583008 50.6392C0.216797 51.1214 0 51.718 0 52.3636V61.0909C0 62.6974 1.3418 64 3 64H45C46.6582 64 48 62.6974 48 61.0909V52.3636C48 50.7571 46.6582 49.4545 45 49.4545H36V43.6364H27V22.9062Z"
        fill="white"
      />
    </svg>
  );
};
