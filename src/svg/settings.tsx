import { CSSProperties } from "react";

export default ({
  onClick,
  height,
  width,
  style,
}: {
  onClick?: () => void;
  height?: string;
  width?: string;
  style: CSSProperties;
}) => {
  return (
    <svg
      width={width ? width : "32"}
      height={height ? height : "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0885 12.9111C17.3823 11.2048 14.6159 11.2048 12.9097 12.9111C11.2035 14.6173 11.2035 17.3836 12.9097 19.0898C14.6159 20.7961 17.3823 20.7961 19.0885 19.0898C20.7947 17.3836 20.7947 14.6173 19.0885 12.9111ZM11.4012 11.4026C13.9406 8.86321 18.0577 8.86321 20.597 11.4026C23.1364 13.9419 23.1364 18.059 20.597 20.5983C18.0577 23.1377 13.9406 23.1377 11.4012 20.5983C8.86188 18.059 8.86188 13.9419 11.4012 11.4026Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0628 27.5641L27.5629 27.064C29.0517 25.5753 29.09 23.1853 27.678 21.6501C27.8973 21.1968 28.0886 20.7336 28.252 20.2629C30.3365 20.1759 31.9998 18.4584 31.9998 16.3525L31.9998 15.6473C31.9998 13.5411 30.3363 11.8235 28.2515 11.7365C28.0882 11.2663 27.897 10.8035 27.6779 10.3507C29.0903 8.81535 29.052 6.42506 27.5631 4.9361L27.0634 4.43648C25.5745 2.94751 23.1842 2.90922 21.6488 4.3216C21.1959 4.10248 20.733 3.91128 20.2628 3.74795C20.1758 1.66327 18.4582 -9.72473e-05 16.3522 -9.4053e-05L15.6468 -9.24266e-05C13.5409 -8.99067e-05 11.8235 1.66312 11.7364 3.74763C11.2662 3.91089 10.8033 4.10204 10.3504 4.32109C8.81517 2.90882 6.42499 2.94713 4.93609 4.43603L4.436 4.93612C2.94736 6.42476 2.90896 8.81447 4.32081 10.3496C4.10144 10.8029 3.91002 11.2663 3.74655 11.737C1.66224 11.8242 -0.000772932 13.5415 -0.000775807 15.6472L-0.000779912 16.3533C-0.000781438 18.4589 1.66214 20.1762 3.74636 20.2634C3.90974 20.7339 4.10104 21.197 4.32028 21.6502C2.90855 23.1853 2.94697 25.5749 4.43554 27.0634L4.93612 27.564C6.42469 29.0526 8.81426 29.091 10.3493 27.6793C10.8025 27.8985 11.2657 28.0898 11.7362 28.2532C11.8235 30.3373 13.5407 32 15.6462 32L16.3526 32C18.4582 32 20.1754 30.3371 20.2626 28.253C20.733 28.0897 21.196 27.8984 21.649 27.6792C23.1841 29.0913 25.5741 29.0529 27.0628 27.5641ZM29.8664 15.6473C29.8664 14.6637 29.0691 13.8664 28.0856 13.8664C27.2366 13.8664 26.5206 13.2607 26.2438 12.4582C26.1034 12.0512 25.9381 11.6509 25.7478 11.2597C25.3766 10.4964 25.4544 9.56211 26.0546 8.96195C26.7497 8.2668 26.7497 7.13975 26.0546 6.4446L25.5549 5.94497C24.8598 5.24982 23.7327 5.24982 23.0376 5.94497C22.4374 6.54513 21.5031 6.62295 20.7398 6.25173C20.3485 6.06143 19.9482 5.89607 19.5411 5.75567C18.7386 5.47886 18.1329 4.76294 18.1329 3.91399C18.1329 2.93051 17.3356 2.13324 16.3522 2.13324L15.6468 2.13324C14.6634 2.13324 13.8662 2.93043 13.8662 3.91382C13.8662 4.76274 13.2606 5.47862 12.458 5.75536C12.0509 5.89573 11.6505 6.06106 11.2592 6.25134C10.496 6.62244 9.56186 6.54459 8.96179 5.94452C8.26668 5.24942 7.13969 5.24942 6.44459 5.94452L5.9445 6.44461C5.24956 7.13955 5.24956 8.26627 5.9445 8.96121C6.54453 9.56124 6.62228 10.4954 6.25104 11.2584C6.06039 11.6503 5.89477 12.0513 5.75417 12.4589C5.47746 13.2613 4.76169 13.8669 3.91291 13.8669C2.92965 13.8669 2.13256 14.6639 2.13256 15.6472L2.13256 16.3533C2.13256 17.3365 2.9296 18.1335 3.91281 18.1335C4.76158 18.1335 5.47732 18.7391 5.754 19.5415C5.89453 19.949 6.06008 20.3499 6.25064 20.7417C6.62176 21.5046 6.54397 22.4386 5.94404 23.0385C5.24915 23.7334 5.24915 24.86 5.94404 25.5549L6.44462 26.0555C7.1395 26.7504 8.26614 26.7504 8.96102 26.0555C9.56095 25.4556 10.4949 25.3778 11.2579 25.7489C11.6497 25.9395 12.0506 26.1051 12.4583 26.2456C13.2606 26.5223 13.8661 27.2379 13.8661 28.0866C13.8661 29.0697 14.6631 29.8667 15.6462 29.8667L16.3526 29.8667C17.3357 29.8667 18.1328 29.0697 18.1328 28.0865C18.1328 27.2378 18.7382 26.5221 19.5405 26.2454C19.9479 26.1049 20.3486 25.9395 20.7402 25.749C21.5033 25.3778 22.4374 25.4556 23.0375 26.0557C23.7325 26.7507 24.8593 26.7507 25.5543 26.0557L26.0544 25.5555C26.7494 24.8605 26.7494 23.7337 26.0544 23.0386C25.4544 22.4386 25.3766 21.5045 25.7477 20.7413C25.9383 20.3496 26.1038 19.9488 26.2443 19.5413C26.521 18.7388 27.2369 18.1331 28.0858 18.1331C29.0692 18.1331 29.8664 17.3359 29.8664 16.3525L29.8664 15.6473Z"
        fill="white"
      />
    </svg>
  );
};
