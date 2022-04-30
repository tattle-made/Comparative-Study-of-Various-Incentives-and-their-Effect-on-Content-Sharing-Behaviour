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
