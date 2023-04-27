import { ZeroDevProvider } from "./ZeroDevContext";
import ZeroDevWallet from "./ZeroDevWallet";
import ZeroDevWalletWagmi from "./ZeroDevWalletWagmi";

interface ZeroDevIntegrationProps {
    withWagmi?: boolean
}

const ZeroDevIntegration: React.FC<ZeroDevIntegrationProps> = ({ withWagmi }) => {
    return (
        <ZeroDevProvider>
            <ZeroDevWallet />
            {withWagmi && <ZeroDevWalletWagmi />}
        </ZeroDevProvider>

    )
}

export default ZeroDevIntegration