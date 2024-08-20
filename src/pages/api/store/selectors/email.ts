import { selector } from "recoil";
import { emailState } from "../atoms/email";

export const emailSelector = selector<string>({
  key: "emailSelector",
  get: ({ get }) => {
    const email = get(emailState);
    return email;
  },
});
