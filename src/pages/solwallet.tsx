import { useState } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { useRecoilValue } from 'recoil';
import { mnemonicSelector } from './api/store/selectors/mnemonic';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const SolWallet = () => {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([{ address: '', balance: '' }]);

    return (
        <div className="flex flex-col items-center justify-between">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>ETH Wallet</CardTitle>
                </CardHeader>
                <CardDescription>
                    <Button onClick={async () => {
                        const seed = mnemonicToSeedSync(mnemonic);
                        const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
                        const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
                        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                        const keypair = Keypair.fromSecretKey(secret);
                        setCurrentIndex(currentIndex + 1);

                        await fetch('https://solana-mainnet.g.alchemy.com/v2/9exH_3EB8W4xlH_SWQirrfjqCOtB17Dj', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                jsonrpc: '2.0',
                                id: 1,
                                method: 'getBalance',
                                params: [keypair.publicKey.toBase58()],
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data.result.value)
                                setAddresses([...addresses, { address: keypair.publicKey.toBase58(), balance: String(Number(data.result.value)) }]);

                            });
                    }}>Generate Address</Button>
                </CardDescription>
            </Card>

            <Table>
                <TableCaption>ETH Addresses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Address</TableHead>
                        <TableHead>Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {addresses.map((address) => (
                        <TableRow key={address.address}>
                            <TableCell>{address.address}</TableCell>
                            <TableCell>{address.balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
