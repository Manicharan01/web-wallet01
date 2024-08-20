import { useRecoilValue } from "recoil";
import { emailSelector } from "./api/store/selectors/email";
import { seedSelector } from "./api/store/selectors/seed";
import { mnemonicSelector } from "./api/store/selectors/mnemonic";
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Mnenomic() {
    const router = useRouter();
    const userEmail = useRecoilValue(emailSelector) as string;
    const userSeed = useRecoilValue(seedSelector);
    const userMnemonic = useRecoilValue(mnemonicSelector) as string;
    const userMnemonicArray = userMnemonic.split(" ");

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Mnemonic</CardTitle>
                    <CardDescription>
                        Write down your mnemonic phrase and keep it safe.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <Label>1. {userMnemonicArray[0]}</Label>
                            <Label>2. {userMnemonicArray[1]}</Label>
                            <Label>3. {userMnemonicArray[2]}</Label>
                            <Label>4. {userMnemonicArray[3]}</Label>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <Label>5. {userMnemonicArray[4]}</Label>
                            <Label>6. {userMnemonicArray[5]}</Label>
                            <Label>7. {userMnemonicArray[6]}</Label>
                            <Label>8. {userMnemonicArray[7]}</Label>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <Label>9. {userMnemonicArray[8]}</Label>
                            <Label>10. {userMnemonicArray[9]}</Label>
                            <Label>11. {userMnemonicArray[10]}</Label>
                            <Label>12. {userMnemonicArray[11]}</Label>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(userMnemonic);
                        router.push("/dashboard");
                    }}>Copy</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
