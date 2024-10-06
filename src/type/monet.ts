import type { Info } from "./";

type MonetType = {
  website: string;
  img: string | null;
  button: Array<{ title: string; content: Info }>;
};

export default MonetType;
