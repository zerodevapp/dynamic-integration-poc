import { useEffect } from 'react';
import { useClient } from 'wagmi';
import { useZeroDev } from './ZeroDevContext';


const ZeroDevWalletWagmi = () => {
    const client  = useClient()
    const {state: { address, chainId }} = useZeroDev()
    useEffect(() => {
        if(address) {
            client.setState((state) => ({...state, data: {...state.data, account: address}}))
        }
    }, [client, address])
    useEffect(() => {
        if(chainId) {
            client.setState((state) => ({...state, data: {...state.data, chain: {
                unsupported: false,
                id: chainId
            }}}))
        }
    }, [client, chainId])
    return null
}

export default ZeroDevWalletWagmi;
