import { ReactNode } from "react";

type Info = Array<{
  type: "normal" | "big" | "play" | "monet";
  name: string;
  icon: ReactNode | null;
  content: Array<{
    after?: "TOP" | "OFCL" | "NEW";
    before?: string;
    header: string;
    text: string;
    content: Array<{
      type: "normal" | "citate" | "i";
      text: string;
      title?: string;
      author?: string;
    }>;
  }>;
}>;

export default Info;
