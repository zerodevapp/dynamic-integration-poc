import React, { useState, useMemo, useContext } from "react";

type ZeroDevState = {
  address?: `0x${string}`, 
  chainId?: number,
}

const ZeroDevContext = React.createContext<{
  state: ZeroDevState,
  setState: (state: ZeroDevState) => void
} | undefined>(undefined);

export const useZeroDev = () => {
  const context = useContext(ZeroDevContext);

  if (context === undefined) {
    throw new Error("useZeroDev must be used within a ZeroDevProvider");
  }

  return context;
};

export const ZeroDevProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<ZeroDevState>({})

    const zeroDevContext = useMemo(() => {
        return {
            state,
            setState
        }

    }, [state, setState])

    return (
        <ZeroDevContext.Provider value={zeroDevContext}>{children}</ZeroDevContext.Provider>
    );
};