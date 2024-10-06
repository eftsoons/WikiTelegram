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
      width={width ? width : "56"}
      height={height ? height : "64"}
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 0L56 15.9993V48L28 64L0 48V16L28 0ZM10.8054 16.5545L28.4457 6.47493L31.8227 8.40443L29.8903 19.5305L40.5926 13.4154L44.6247 15.7193L26.9842 25.7989L23.6324 23.8838L25.5445 12.7405L14.8375 18.8584L10.8054 16.5545ZM34.2609 38.4303L39.906 35.2049V51.5625L43.9884 49.2298V32.8722L49.6336 29.6467V25.8453L34.2609 34.6289V38.4303ZM20.2754 46.6076L12.1103 41.9422V49.2858L8.02785 46.9531V26.794L21.359 34.4113V38.1551L12.1103 32.8706V38.1983L20.2754 42.8637V46.6076Z"
        fill="white"
      />
    </svg>
  );
};
