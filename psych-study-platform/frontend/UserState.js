/**
 * manages the user lifecycle
 */

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

export const UserState = atom({
  key: "User",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

/**
 * Empty object check code gotten from here
 * https://stackoverflow.com/a/32108184
 */
export const UserLoginStatusState = selector({
  key: "UserLoginStatusState",
  get: ({ get }) => {
    const user = get(UserState);

    if (
      user &&
      Object.keys(user).length === 0 &&
      Object.getPrototypeOf(user) === Object.prototype
    ) {
      return false;
    } else {
      return true;
    }
  },
});

export const UserMetric = atom({
  key: "UserMetric",
  default: {},
});

export const UserMetricLabelState = selector({
  key: "UserMetricLabelState",
  get: ({ get }) => {
    const userMetric = get(UserMetric);

    if (
      userMetric &&
      Object.keys(userMetric).length === 0 &&
      Object.getPrototypeOf(userMetric) === Object.prototype
    ) {
      return "";
    } else {
      let unit;
      if (userMetric.type === "VANITY") unit = "followers";
      else if (userMetric.type === "MONETARY") unit = "coins";
      else return "";

      return `${userMetric.points} ${unit}`;
    }
  },
});
