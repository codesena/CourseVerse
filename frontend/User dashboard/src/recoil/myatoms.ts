import { courseType } from "@adityakumar172001/courselling_types";
import { atom } from "recoil";

export const registerState = atom<boolean>({
  key: "registerState",
  default: localStorage.getItem("usertoken") ? true : false,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: localStorage.getItem("usertoken") ? true : false,
});

export const coursesState = atom<courseType[]>({
  key: "coursesState",
  default: [],
});

export const purchasedCoursesState = atom<courseType[]>({
  key: "purchasedCoursesState",
  default: [],
});

export const drawerOpenState = atom<boolean>({
  key: "drawerOpenState",
  default: false,
});
