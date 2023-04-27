import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { NFTMinting } from './NFTMinting';
import ZeroDevIntegration from './ZeroDevIntegration/ZeroDevIntegration';



const App = () => ( 
  <DynamicContextProvider 
    settings={{ 
      environmentId: 'd98d0ece-a578-498d-8f46-84b9a8e529d7',
    }}> 
    <DynamicWagmiConnector>
      <DynamicWidget /> 
      <ZeroDevIntegration withWagmi />
      <NFTMinting />
    </DynamicWagmiConnector>
  </DynamicContextProvider> 
);

export default App;
