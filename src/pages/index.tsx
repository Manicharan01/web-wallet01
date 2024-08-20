import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()
    return (
        <div
            className="flex items-center justify-center h-screen"
        >
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Welcome to Something Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Button onClick={() => {
                                router.push("/login")
                            }}>Log In</Button>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Button onClick={() => {
                                router.push("/signup")
                            }}>Sign Up</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
