import React from 'react';

import { Footer } from '../atoms/Footer';

import { Header } from '../atoms/Header';
import { SidePanel } from '../atoms/SidePanel';

import { Container, Flex, Spacer, Image, Text } from '@chakra-ui/react';

import footerImage from '../../assets/raidguild_mark.png';
import raidGuildLogoLeft from '../../assets/raid--left.png';
import raidGuildLogoRight from '../../assets/raid--right.png';
import { AccountButton } from '../molecules/AccountButton';
// import { useCurrentUser } from '../../contexts/currentUserContext';
import { MonsterForm } from '../molecules/MonsterForm';

export interface AppContainerProps {
  /**
   * The components to render within the app container
   */
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  // const { currentUser } = useCurrentUser();

  return (
    <Flex h='100vh' w='100vw'>
      <SidePanel>
        <Image src={raidGuildLogoLeft} alt='Swords logo' maxH='75vh' />
      </SidePanel>

      <Container centerContent flexDirection='column' width='100%'>
        <Header>
          <Text fontSize='6xl'>Monsters & Encounters</Text>
          <Spacer />
          <AccountButton />
        </Header>
        <Container centerContent marginTop='10px'>
          <MonsterForm />
        </Container>

        <Spacer />

        <Footer>
          <Image src={footerImage} alt='Created by Raid Guild' />
        </Footer>
      </Container>

      <SidePanel>
        <Image src={raidGuildLogoRight} alt='Swords logo' maxH='75vh' />
      </SidePanel>
      {children}
    </Flex>
  );
};
