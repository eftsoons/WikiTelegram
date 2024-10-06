const Xplore = () => {
  return (
    <div>
      <img
        style={{
          position: "absolute",
          height: "390px",
          width: "90%",
          top: "0",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        src="phonestudy.png"
      />

      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "30px",
          lineHeight: "37px",
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          textAlign: "center",
        }}
      >
        Xplore — тут ты откроешь для себя приложения, игры и сервисы различных
        блокчейнов
      </span>
    </div>
  );
};

export default Xplore;
