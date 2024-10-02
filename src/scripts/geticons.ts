import * as allicons from "../svg";

export default (nameicon: keyof typeof allicons) => {
  return allicons[nameicon];
};

export type IconsAll = keyof typeof allicons;
