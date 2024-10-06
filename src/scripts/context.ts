import { createContext } from "react";

const InfoDivContext = createContext({
  type: "normal",
  setinfodiv: () => {},
  indexmain: 0,
  index: 0,
  key: 0,
} as {
  type: "normal" | "play" | "big" | "monet";
  setinfodiv: Function | undefined;
  indexmain: number | undefined;
});

export default InfoDivContext;
