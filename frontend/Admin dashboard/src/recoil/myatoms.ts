import { atom } from "recoil";
import { courseType } from "@adityakumar172001/courselling_types";

export const registerState = atom<boolean>({
  key: "registerState",
  default: localStorage.getItem("admintoken") ? true : false,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: localStorage.getItem("admintoken") ? true : false,
});

export const coursesState = atom<courseType[]>({
  key: "coursesState",
  default: [],
});

export const drawerOpenState = atom<boolean>({
  key: "drawerOpenState",
  default: false,
});
