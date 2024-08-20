import { atom } from "recoil";

export const mnemonicState = atom<string>({
  key: "mnemonicState",
  default: "",
});
