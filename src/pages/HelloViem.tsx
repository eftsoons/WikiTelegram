const HelloViem = () => {
  return (
    <div>
      <span
        style={{
          position: "absolute",
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "50px",
          lineHeight: "61px",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Привет!
      </span>
      <span
        style={{
          position: "absolute",
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "30px",
          lineHeight: "37px",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",
        }}
      >
        XP Wiki — это:
      </span>
      <img
        style={{
          position: "absolute",
          height: "160px",
          width: "90%",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        src="hashtags.png"
      />
    </div>
  );
};

export default HelloViem;
