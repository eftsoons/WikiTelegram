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
      width={width ? width : "64"}
      height={height ? height : "64"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_616_5342)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.4094 3.63715C22.1033 -1.90338 11.999 -1.11393 5.49033 6.00553C-1.83011 14.0129 -1.83011 26.9954 5.49034 35.0028L32 64L58.5097 35.0028C65.8301 26.9954 65.8301 14.0129 58.5097 6.00553C52.001 -1.11392 41.8967 -1.90338 34.5906 3.63715C33.6794 4.32815 32.8117 5.11761 32 6.00553C31.1883 5.11761 30.3206 4.32815 29.4094 3.63715ZM32 54.6608L53.8588 30.7509C58.9784 25.1509 58.9784 15.8574 53.8588 10.2574C49.0368 4.98291 41.4729 4.98291 36.6509 10.2574L32 15.3447L27.3491 10.2574C22.5271 4.98291 14.9633 4.98291 10.1412 10.2574C5.02164 15.8574 5.02165 25.1509 10.1412 30.7509L32 54.6608Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_5342">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
