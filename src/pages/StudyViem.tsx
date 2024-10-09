const StudyViem = () => {
  return (
    <div>
      <img
        style={{
          position: "absolute",
          height: "800px  ",
          width: "90%",
          top: "-525px",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        src="PhoneStudy.png"
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
          width: "90%",
        }}
      >
        Study — раздел с обучением. Тут размещены основные материалы о
        криптовалюте
      </span>
    </div>
  );
};

export default StudyViem;
