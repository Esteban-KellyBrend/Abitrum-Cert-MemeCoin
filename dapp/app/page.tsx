"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
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
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>
 //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
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
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
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
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
return (
    <main   style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url('https://www.dexerto.com/cdn-image/wp-content/uploads/2024/02/27/mrfresh-cat-bounty-outrage.jpg?width=828&quality=75&format=auto')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>

        <div style={{ 
      border: '2px solid black', 
      padding: '40px', 
      margin: '20px', 
      backgroundColor: 'maroon',
      backgroundSize: 'cover',
      backgroundImage: `url('https://us-tuna-sounds-images.voicemod.net/83cf4323-16bb-4aca-895e-019c1d748381-1681607929918.jpg')`
    }}>
          <button onClick={() => {connectWallet();}}
        className="p-3 bg-yellow-400 text-white rounded"
      >
        {walletKey != "" ? walletKey : " Connect wallet"}
      </button>
      </div>

      <div style={{ 
      border: '2px solid black', 
      padding: '40px', 
      margin: '20px', 
      backgroundColor: 'lightgray',
      textAlign: 'center',
      backgroundImage: `url('https://tr.rbxcdn.com/40e5bbcc6c67c44166f7fa425025d896/420/420/Hat/Png')`

    }}>
      <div >
      <br></br>
      <form>
      <div style={{ textAlign: 'left' }}>Mint Amount</div>
        </form>
      <input
        type="number"
        value = {mintingAmount || ""}
        onChange = {(e) => mintAmountChange(e)}
        style={{color:"Black", marginRight: '10px' }}
      />
      <button 
        onClick={() => {mintCoin();}}
        className="p-3 bg-slate-800 text-white rounded"
        style={{ width: '120px', background: 'linear-gradient(to right, #4F46E5, #945DD6)' }}
      >
        {"Mint Token"}
      </button> 
      
    </div>
    <br></br>

<div>
<form>
<div style={{ textAlign: 'left' }}>Stake Amount</div>
    </form>
  <input
    type="number"
    value = {stakingAmount || ""}
    onChange = {(e) => stakeAmountChange(e)}
    style={{color:"Black", marginRight: '10px' }}
  />
 
  <button 
    onClick={stakeCoin}
    className="p-3 bg-slate-800 text-white rounded"
    style={{ width: '120px', background: 'linear-gradient(to right, #4F46E5, #945DD6)'}}
  >
    {"Stake Token"}
  </button> 
</div>

<div>
    <br></br>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-slate-800 text-black rounded"
        style={{ width: '120px', background: 'linear-gradient(to right, #FFA500, #FFFFFF)'}}
      >
        {"Withdraw"}
      </button> 
      </div>
      </div>

    </main>
  );
}