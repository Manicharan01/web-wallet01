import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export interface User {
  username: string;
  password: string;
  mnemonic: string;
  seed: Promise<Buffer>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { username, password } = req.body;
    const users: User[] = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
    const user: User = users[username];
    if (user.username === username && user.password === password) {
      res.status(200).json({
        message: "User authenticated",
        email: user.username,
        mnemonic: user.mnemonic,
        seed: user.seed,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
