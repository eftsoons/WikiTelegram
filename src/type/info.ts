import { IconsAll } from "../scripts";

type Info = Array<{
  type: "normal" | "big" | "play";
  name: string;
  icon: IconsAll | null;
  content: Array<{
    after?: "TOP" | "OFCL" | "NEW";
    before?: string;
    header: string;
    text: string;
    content: Array<
      | {
          type: "normal";
          content: Array<
            | {
                type: "h1" | "h2" | "h3" | "text";
                text: string;
              }
            | {
                type: "image";
                content: string | undefined;
              }
          >;
        }
      | {
          type: "citate";
          text: string;
          author: string;
        }
      | {
          type: "i";
          title: string;
          text: string;
        }
    >;
  }>;
}>;

export default Info;
