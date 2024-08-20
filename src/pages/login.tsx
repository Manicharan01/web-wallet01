import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { emailState } from "./api/store/atoms/email";
import { mnemonicState } from "./api/store/atoms/mnemonic";
import { seedState } from "./api/store/atoms/seed";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userEmail, setUserEmail] = useRecoilState(emailState);
    const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);
    const [seed, setSeed] = useRecoilState(seedState);

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Welcome to Something Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="username"
                                >Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="password"
                                >Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={async () => {
                        await fetch(`http://localhost:3000/api/login`, {
                            method: 'POST',
                            body: JSON.stringify({
                                username,
                                password,
                            }),
                            headers: {
                                "content-Type": "application/json",
                            },
                        }).then((response) => {
                            response.json().then((text) => {
                                setUserEmail(text.username);
                                setMnemonic(text.mnemonic);
                                setSeed(text.seed);
                                alert(text.message);
                                router.push("/seed");

                            })
                        });
                    }}>Log In</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
