import { Outlet } from "react-router-dom";
import Button from "./Button";

const Next = ({
  training,
  settraining,
}: {
  training: number;
  settraining: Function;
}) => {
  return (
    <div>
      <Outlet />
      <Button
        onClick={async () => {
          settraining(training + 1);

          localStorage.setItem("training", String(training + 1));
        }}
        style={{
          position: "absolute",
          bottom: "25px",
          width: "50%",
          left: "25%",
          backgroundColor: "#F75E25",
        }}
      >
        Далее
      </Button>
    </div>
  );
};

export default Next;
