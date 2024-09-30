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
      <g clipPath="url(#clip0_616_5274)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.7791 15.7663C50.3118 14.7711 49.2324 13.6883 48.2379 14.2202L26.3862 25.9092C26.1876 26.0154 26.0249 26.1781 25.9186 26.3767L14.2209 48.2337C13.6882 49.2289 14.7676 50.3117 15.7621 49.7798L37.6138 38.0908C37.8124 37.9846 37.9751 37.8219 38.0814 37.6233L49.7791 15.7663ZM19.2665 43.1858C18.7402 44.1796 19.815 45.2562 20.8071 44.729L35.0625 37.1552C35.7395 36.7955 35.8762 35.8825 35.3343 35.3397L28.6405 28.6351C28.0987 28.0923 27.1871 28.2293 26.828 28.9073L19.2665 43.1858Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 59.2C16.9779 59.2 4.8 47.0221 4.8 32C4.8 16.9779 16.9779 4.8 32 4.8C47.0221 4.8 59.2 16.9779 59.2 32C59.2 47.0221 47.0221 59.2 32 59.2Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_5274">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
