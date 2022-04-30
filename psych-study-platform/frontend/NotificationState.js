import { atom } from "recoil";

export const NotificationState = atom({
  key: "NotificationState",
  default: { message: "hello" },
});
