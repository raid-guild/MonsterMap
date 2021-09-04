import React from 'react';

import { LoaderContextProvider } from './contexts/loaderContext';
import { InjectedProvider } from './contexts/injectedProviderContext';
import { AppContainer } from './components/AppContainer';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { CurrentUserContextProvider } from './contexts/currentUserContext';
import { ContractContextProvider } from './contexts/contractContext';
import { MapContractContextProvider } from './contexts/mapContractContext';

const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <LoaderContextProvider>
        <InjectedProvider>
          <CurrentUserContextProvider>
            <ContractContextProvider>
              <MapContractContextProvider>
                <AppContainer />
              </MapContractContextProvider>
            </ContractContextProvider>
          </CurrentUserContextProvider>
        </InjectedProvider>
      </LoaderContextProvider>
    </ChakraProvider>
  );
};

export default App;
