import Chain from "../assets/icon/chain.svg";
import Course from "../assets/icon/course.svg";

const icon = {
  Chain: Chain,
  Course: Course,
};

export type Icons = keyof typeof icon;

export default (nameicon: keyof typeof icon) => {
  return icon[nameicon];
};
