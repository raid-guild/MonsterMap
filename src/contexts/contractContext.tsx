import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInjectedProvider } from './injectedProviderContext';
import { Contract } from 'web3-eth-contract';
import MonsterAbi from '../contracts/MonstersAbi.json';

type ContractContextType = {
  contract?: Contract;
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => void;
};

export const ContractContext = createContext<ContractContextType>({
  contract: undefined,
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => {},
});

interface ContractProps {
  children: any;
}

const monsterAddrs: any = {
  mainnet: '0xeCb9B2EA457740fBDe58c758E4C574834224413e',
  kovan: '',
  xdai: '',
  matic: '',
};

export const ContractContextProvider: React.FC<ContractProps> = ({
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
          MonsterAbi,
          monsterAddrs[injectedChain.network],
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
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const { contract, setContract } = useContext(ContractContext);
  return { contract, setContract };
};
