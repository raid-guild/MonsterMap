import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInjectedProvider } from './injectedProviderContext';
import { Contract } from 'web3-eth-contract';
import MapsAbi from '../contracts/MapsAbi.json';

type ContractContextType = {
  contract?: Contract;
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => void;
};

export const MapContractContext = createContext<ContractContextType>({
  contract: undefined,
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => {},
});

interface ContractProps {
  children: any;
}

const mapAddrs: any = {
  mainnet: '0x6C8715ade6361D35c941EB901408EFca8A20F65a',
  kovan: '',
  xdai: '',
  matic: '',
};

export const MapContractContextProvider: React.FC<ContractProps> = ({
  children,
}: ContractProps) => {
  const [contract, setContract] = useState<Contract>();
  const { injectedChain, web3Modal, injectedProvider } = useInjectedProvider();

  useEffect(() => {
    console.log('Loading contract');
    console.log('web3Modal', web3Modal);
    console.log('injectedChain', injectedChain);

    const initContract = async () => {
      console.log('network name', injectedChain.network);
      try {
        const contract: Contract = await new injectedProvider.eth.Contract(
          MapsAbi,
          mapAddrs[injectedChain.network],
        );
        console.log('Contract: ', contract);
        setContract(contract);
      } catch (e) {
        console.error(`Could not init contract`);
      }
    };

    if (injectedProvider?.eth && injectedChain?.network) {
      initContract();
    }
  }, [injectedChain, web3Modal.web3]);

  return (
    <MapContractContext.Provider value={{ contract, setContract }}>
      {children}
    </MapContractContext.Provider>
  );
};

export const useMapContract = () => {
  const { contract, setContract } = useContext(MapContractContext);
  return { contract, setContract };
};
