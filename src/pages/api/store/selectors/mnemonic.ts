import { selector } from "recoil";
import { mnemonicState } from "../atoms/mnemonic";

export const mnemonicSelector = selector<string>({
  key: "mnemonicSelector",
  get: ({ get }) => {
    const mnemonic = get(mnemonicState);
    return mnemonic;
  },
});
