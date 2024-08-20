import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export interface User {
  username: string;
  password: string;
  mnemonic: string;
  seed: Buffer;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { username, password } = req.body;
    const users: User[] = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
    const user: User = users[username];
    if (user) {
      res.status(409).json({
        message: "User already exists",
      });
    } else {
      const mnemonic = generateMnemonic();
      const seed: Buffer = mnemonicToSeedSync(mnemonic);
      users[username] = { mnemonic, seed, username, password };
      fs.writeFileSync("./users.json", JSON.stringify(users));
      res.status(200).json({
        message: "Mnemonic generated successfully",
        mnemonic,
        seed,
        username,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
