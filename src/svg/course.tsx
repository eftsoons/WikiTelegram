export default ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clipPath="url(#clip0_616_5300)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 64C33.1614 64 34.1029 62.8948 34.1029 61.5314C34.1029 60.3621 33.949 59.1573 33.7922 57.9291C33.6292 56.6518 33.4629 55.3491 33.4629 54.0343H33.92V52.9421C38.2854 52.547 42.2657 50.8177 45.4501 48.1654L46.2229 48.9382L46.5462 48.615C47.4759 49.5447 48.2794 50.5834 49.0673 51.6019C49.8249 52.5813 50.5681 53.542 51.3949 54.3688C52.359 55.3329 53.8062 55.4486 54.6274 54.6274C55.4486 53.8062 55.3329 52.359 54.3688 51.3949C53.542 50.5681 52.5813 49.8249 51.6019 49.0673C50.5835 48.2795 49.5447 47.4759 48.615 46.5462L48.9382 46.2229L48.1654 45.4501C50.8177 42.2657 52.547 38.2854 52.9421 33.92H54.0343V33.4629C55.3491 33.4629 56.6518 33.6292 57.929 33.7922C59.1573 33.949 60.3621 34.1029 61.5314 34.1029C62.8948 34.1029 64 33.1614 64 32C64 30.8386 62.8948 29.8971 61.5314 29.8971C60.3621 29.8971 59.1573 30.0509 57.9291 30.2078C56.6518 30.3708 55.3491 30.5371 54.0343 30.5371V30.08H52.9421C52.547 25.7146 50.8177 21.7343 48.1654 18.5499L48.9382 17.7771L48.615 17.4538C49.5447 16.5241 50.5834 15.7206 51.6019 14.9327C52.5813 14.1751 53.542 13.4319 54.3688 12.6051C55.3329 11.641 55.4486 10.1938 54.6274 9.37258C53.8062 8.55136 52.359 8.66714 51.3949 9.63118C50.5681 10.458 49.825 11.4187 49.0673 12.3981C48.2795 13.4165 47.4759 14.4553 46.5462 15.385L46.2229 15.0618L45.4501 15.8346C42.2657 13.1823 38.2854 11.453 33.92 11.0579V9.96571H33.4629C33.4629 8.65092 33.6292 7.34824 33.7922 6.07099C33.949 4.84272 34.1029 3.63792 34.1029 2.46857C34.1029 1.10521 33.1614 0 32 0C30.8386 0 29.8971 1.10521 29.8971 2.46857C29.8971 3.63792 30.0509 4.84266 30.2078 6.07092L30.2078 6.07103C30.3708 7.34827 30.5371 8.65093 30.5371 9.96571H30.08V11.0579C25.7146 11.453 21.7343 13.1823 18.5499 15.8346L17.7771 15.0618L17.4538 15.385C16.5241 14.4553 15.7206 13.4166 14.9328 12.3982L14.9327 12.3981C14.175 11.4187 13.4319 10.458 12.6051 9.63118C11.641 8.66714 10.1938 8.55136 9.37259 9.37258C8.55137 10.1938 8.66714 11.641 9.63119 12.6051C10.458 13.4319 11.4187 14.175 12.3981 14.9327L12.3982 14.9327C13.4166 15.7206 14.4553 16.5241 15.385 17.4538L15.0618 17.7771L15.8346 18.5499C13.1823 21.7343 11.453 25.7146 11.0579 30.08H9.96571V30.5371C8.65094 30.5371 7.34828 30.3708 6.07104 30.2078L6.07092 30.2078C4.84266 30.0509 3.63792 29.8971 2.46857 29.8971C1.10521 29.8971 0 30.8386 0 32C0 33.1614 1.10521 34.1029 2.46857 34.1029C3.63792 34.1029 4.84266 33.9491 6.07092 33.7922L6.07103 33.7922C7.34827 33.6292 8.65093 33.4629 9.96571 33.4629V33.92H11.0579C11.453 38.2854 13.1823 42.2657 15.8346 45.4501L15.0618 46.2229L15.385 46.5462C14.4553 47.4759 13.4166 48.2794 12.3982 49.0672L12.3981 49.0673C11.4187 49.8249 10.458 50.5681 9.63118 51.3949C8.66714 52.359 8.55136 53.8062 9.37258 54.6274C10.1938 55.4486 11.641 55.3329 12.6051 54.3688C13.4319 53.542 14.175 52.5813 14.9326 51.602L14.9327 51.6019C15.7206 50.5834 16.5241 49.5447 17.4538 48.615L17.7771 48.9382L18.5499 48.1654C21.7343 50.8177 25.7146 52.547 30.08 52.9421V54.0343H30.5371C30.5371 55.3491 30.3708 56.6518 30.2078 57.929C30.051 59.1573 29.8971 60.3621 29.8971 61.5314C29.8971 62.8948 30.8386 64 32 64ZM21.8387 44.8766C24.1599 46.7107 26.9887 47.9307 30.08 48.2911V43.4702C30.426 43.0428 30.6286 42.5244 30.6286 41.9657C30.6286 41.407 30.426 40.8886 30.08 40.4612V37.2282C29.9425 37.1705 29.8077 37.1074 29.676 37.0393L27.3747 39.3406C26.8278 39.3982 26.318 39.6215 25.9229 40.0166C25.5279 40.4116 25.3046 40.9214 25.247 41.4683L21.8387 44.8766ZM27.0593 34.2255C27.0164 34.1251 26.9763 34.0232 26.9391 33.92H23.5388C23.1114 33.574 22.593 33.3714 22.0343 33.3714C21.4756 33.3714 20.9572 33.574 20.5298 33.92H15.7089C16.0693 37.0113 17.2893 39.8401 19.1234 42.1613L22.5317 38.753C23.0786 38.6954 23.5884 38.4721 23.9834 38.0771C24.3785 37.682 24.6018 37.1722 24.6594 36.6253L27.0593 34.2255ZM42.1613 19.1234C39.8401 17.2893 37.0113 16.0693 33.92 15.7089V20.5298C33.574 20.9572 33.3714 21.4756 33.3714 22.0343C33.3714 22.593 33.574 23.1114 33.92 23.5388V26.574C34.118 26.634 34.3115 26.7045 34.4997 26.785L36.6253 24.6594C37.1722 24.6018 37.682 24.3785 38.0771 23.9834C38.4721 23.5884 38.6954 23.0786 38.753 22.5317L42.1613 19.1234ZM37.3136 29.4017C37.4264 29.6199 37.5254 29.8464 37.6094 30.08H40.4612C40.8886 30.426 41.407 30.6286 41.9657 30.6286C42.5244 30.6286 43.0428 30.426 43.4702 30.08H48.2911C47.9307 26.9887 46.7107 24.1599 44.8766 21.8387L41.4683 25.247C40.9214 25.3046 40.4116 25.5279 40.0166 25.9229C39.6215 26.318 39.3982 26.8278 39.3406 27.3747L37.3136 29.4017ZM48.2911 33.92C47.9307 37.0113 46.7107 39.8401 44.8766 42.1613L41.4683 38.753C40.9214 38.6954 40.4116 38.4721 40.0166 38.0771C39.6215 37.682 39.3982 37.1722 39.3406 36.6253L37.3136 34.5983C37.4264 34.3801 37.5254 34.1536 37.6094 33.92H40.4612C40.8886 33.574 41.407 33.3714 41.9657 33.3714C42.5244 33.3714 43.0428 33.574 43.4702 33.92H48.2911ZM36.6253 39.3406L34.4997 37.215C34.3115 37.2955 34.118 37.366 33.92 37.426V40.4612C33.574 40.8886 33.3714 41.407 33.3714 41.9657C33.3714 42.5244 33.574 43.0428 33.92 43.4702V48.2911C37.0113 47.9307 39.8401 46.7107 42.1613 44.8766L38.753 41.4683C38.6954 40.9214 38.4722 40.4116 38.0771 40.0166C37.682 39.6215 37.1722 39.3982 36.6253 39.3406ZM15.7089 30.08C16.0693 26.9887 17.2893 24.1599 19.1234 21.8387L22.5317 25.247C23.0786 25.3046 23.5884 25.5279 23.9834 25.9229C24.3785 26.318 24.6018 26.8278 24.6594 27.3747L27.0593 29.7745C27.0164 29.8749 26.9763 29.9768 26.9391 30.08H23.5388C23.1114 30.426 22.593 30.6286 22.0343 30.6286C21.4756 30.6286 20.9572 30.426 20.5298 30.08H15.7089ZM27.3747 24.6594L29.676 26.9607C29.8077 26.8926 29.9425 26.8295 30.08 26.7718V23.5388C30.426 23.1114 30.6286 22.593 30.6286 22.0343C30.6286 21.4756 30.426 20.9572 30.08 20.5298V15.7089C26.9887 16.0693 24.1599 17.2893 21.8387 19.1234L25.247 22.5317C25.3046 23.0786 25.5279 23.5884 25.9229 23.9834C26.318 24.3785 26.8278 24.6018 27.3747 24.6594Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_5300">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
