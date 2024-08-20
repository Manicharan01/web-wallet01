import { useRecoilValue } from "recoil";
import { EthWallet } from "./ethwallet";
import { SolWallet } from "./solwallet";
import { mnemonicSelector } from "./api/store/selectors/mnemonic";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const userMnemonic = useRecoilValue(mnemonicSelector) as string;
    const [walletType, setWalletType] = useState("");

    return (
        <div className="flex items-center justify-center h-screen">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Wallet</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setWalletType("eth")}>ETH</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setWalletType("sol")}>SOL</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {walletType === "eth" && <EthWallet />}
            {walletType === "sol" && <SolWallet />}
        </div>
    );
}
