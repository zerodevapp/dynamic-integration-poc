import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
  useConnect
} from "wagmi";
import contractAbi from "./0xcA171d43B2f5e5c1a071d3Dba8354eF0E2df4816.json";

export function NFTMinting({ label = undefined }) {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork()

  const [balanceChanging, setBalanceChanging] = useState(false)

  const { config } = usePrepareContractWrite({
    address: "0xcA171d43B2f5e5c1a071d3Dba8354eF0E2df4816",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
    enabled: true
  });
  const { write: mint } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0xcA171d43B2f5e5c1a071d3Dba8354eF0E2df4816",
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });


  useEffect(() => {
    if (balance) setBalanceChanging(false)
  }, [balance])



  const interval = useRef<any>()

  const handleClick = useCallback(() => {
    setBalanceChanging(true)
    if (mint) {
      mint()
      interval.current = setInterval(() => {
        refetch()
      }, 1000)
      setTimeout(() => {
        if (interval.current) {
          clearInterval(interval.current)
        }
      }, 100000)
    }
  }, [mint, refetch])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [balance, interval]);

  if (!isConnected) return null

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <strong style={{ fontSize: '1.5rem' }}>Mint Count</strong>
        <div style={{ fontSize: "2rem", fontWeight: 'medium', width: 50, height: 50, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '10px solid #2B8DE3' }}>{`${balance ?? 0}`}</div>
        <button
          disabled={balanceChanging}
          onClick={handleClick}
        >
          Gas-free Mint
        </button>
        {chain?.blockExplorers?.default.url && <a rel="noreferrer" href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`} target="_blank">Block Explorer</a>}
    </div>
  );
}