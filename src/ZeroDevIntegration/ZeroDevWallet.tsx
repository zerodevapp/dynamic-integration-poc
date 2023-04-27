import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { getZeroDevSigner } from '@zerodevapp/sdk';
import { Signer } from 'ethers';
import { useEffect } from 'react';
import { useZeroDev } from './ZeroDevContext';

const ZeroDevWallet = () => {
  const { setState } = useZeroDev();
  const dynamicContext = useDynamicContext()
  // console.log(dynamicContext)
  useEffect(() => {
    if (dynamicContext.primaryWallet) {
      (dynamicContext.primaryWallet.connector.getSigner() as Promise<Signer>).then((dynamicSigner) => {
        getZeroDevSigner({
          projectId: '68bc6515-8a0e-4346-b3c4-8f4aa3f780a5',
          owner: dynamicSigner
        }).then(zeroDevSigner => {
          if (dynamicContext.primaryWallet) {
            if (dynamicContext.primaryWallet.connector.key === 'magiclink') {
                dynamicContext.primaryWallet.connector.getSigner = async () => {
                return zeroDevSigner
                }
                (zeroDevSigner.getAddress() as Promise<`0x${string}`>).then(address => {
                if (dynamicContext.primaryWallet) {
                    dynamicContext.primaryWallet.address = address
                    dynamicContext.primaryWallet.connector.fetchPublicAddress = async () => {
                    return address
                    }
                    zeroDevSigner.getChainId().then(chainId => {
                        dynamicContext.setNetwork(chainId)
                        setState({
                            address,
                            chainId
                        })
                    })
                }
                })
            } else {
                setState({})
            }
          }
        })
      })
    }

  }, [dynamicContext.primaryWallet, dynamicContext.setNetwork, setState])
  return null
}

export default ZeroDevWallet;
