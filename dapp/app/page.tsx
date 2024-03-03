"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [currentData, setCurrentData] = useState("");

  const connectToWallet = async () => {
    const { ethereum } = window as any;
  
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
  
      setWalletKey(accounts[0]);
    } catch (error: any) {
      console.error("Error connecting wallet:", error.message);
    }
  };  

  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const mintNewCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const updateMintAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
 
  const [stakingAmount, setStakingAmount] = useState<number>();

  const stakeNewCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  const updateStakeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawStakedCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };
  
  const isBrowser = typeof window !== 'undefined';


  return (
    <main style={{ minHeight: isBrowser ? `${window.innerHeight}px` : '100vh', backgroundImage: `url('https://www.dexerto.com/cdn-image/wp-content/uploads/2024/02/27/mrfresh-cat-bounty-outrage.jpg?width=828&quality=75&format=auto')`, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div style={{ border: '2px solid #8b4513', padding: '40px', margin: '20px', borderRadius: '15px', backgroundSize: 'cover', backgroundImage: `url('https://us-tuna-sounds-images.voicemod.net/83cf4323-16bb-4aca-895e-019c1d748381-1681607929918.jpg')` }}>
        <button onClick={() => { connectToWallet(); }} className="p-3 bg-yellow-500 text-white rounded" style={{ border: '2px solid #ffff00', borderRadius: '10px' }}>{walletKey !== "" ? `${walletKey.substring(0, 8)}...` : " Connect Wallet"}</button>
      </div>

      <div style={{ border: '2px solid #800080', padding: '40px', margin: '20px', textAlign: 'center', backgroundImage: `url('https://tr.rbxcdn.com/40e5bbcc6c67c44166f7fa425025d896/420/420/Hat/Png')`, backgroundSize: 'cover', borderRadius: '15px' }}>
        <div><br /></div>
        <form><div style={{ textAlign: 'left', color: '#ff4500' }}>Mint</div></form>
        <input type="number" value={mintingAmount || ""} onChange={(e) => updateMintAmount(e)} style={{ color: "#4B0082", marginRight: '10px', borderRadius: '8px', border: '1px solid #4B0082' }} placeholder="Mint amount" />
        <button onClick={() => { mintNewCoin(); }} className="p-3 bg-slate-800 text-white rounded" style={{ width: '120px', background: 'linear-gradient(to right, #4F46E5, #945DD6)', borderRadius: '10px' }}>{"Mint Now"}</button><br />

        <form><div style={{ textAlign: 'left', color: '#8B0000' }}>Stake</div></form>
        <input type="number" value={stakingAmount || ""} onChange={(e) => updateStakeAmount(e)} style={{ color: "#006400", marginRight: '10px', borderRadius: '8px', border: '1px solid #006400' }} placeholder="Stake amount" />
        <button onClick={stakeNewCoin} className="p-3 bg-slate-800 text-white rounded" style={{ width: '120px', background: 'linear-gradient(to right, #4F46E5, #945DD6)', borderRadius: '10px' }}>{"Stake Now"}</button>

        <div><br /><br /></div>
        <button onClick={withdrawStakedCoin} className="p-3 bg-slate-800 text-black rounded" style={{ width: '120px', background: 'linear-gradient(to right, #FFA500, #FFFFFF)', borderRadius: '10px' }}>{"Withdraw"}</button>
      </div>
    </main>
  );
}