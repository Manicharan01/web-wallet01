import { useState } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import { useRecoilValue } from 'recoil';
import { mnemonicSelector } from './api/store/selectors/mnemonic';
import { mnemonicToSeedSync } from 'bip39';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const EthWallet = () => {
    const mnemonic = useRecoilValue(mnemonicSelector) as string;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([{ address: '', balance: '' }]);

    return (
        <div className="flex flex-col justify-around">
            <div className="flex flex-col items-center justify-center">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>ETH Wallet</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={async () => {
                            const seed = mnemonicToSeedSync(mnemonic)
                            const derivationPath = `m/44'/60'/${currentIndex}'/0'`
                            const hdNode = HDNodeWallet.fromSeed(seed);
                            const childNode = hdNode.derivePath(derivationPath);
                            const privateKey = childNode.privateKey;
                            const wallet = new Wallet(privateKey);
                            setCurrentIndex(currentIndex + 1);

                            await fetch('https://eth-mainnet.g.alchemy.com/v2/9exH_3EB8W4xlH_SWQirrfjqCOtB17Dj', {
                                method: 'POST',
                                body: JSON.stringify({
                                    jsonrpc: '2.0',
                                    id: 1,
                                    method: 'eth_getBalance',
                                    params: [wallet.address, 'latest'],
                                }),
                            }).then((res) => res.json()).then((data) => {
                                console.log(data.result);
                                setAddresses([...addresses, { address: wallet.address, balance: String(Number(data.result)) }]);
                            });
                        }}>Generate Address</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="flex flex-col items-center justify-center">
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
        </div>
    );
};
