import React from 'react';

import { Formik, Form } from 'formik';
import { useInjectedProvider } from '../../../contexts/injectedProviderContext';
import { useCurrentUser } from '../../../contexts/currentUserContext';
import { useContract } from '../../../contexts/contractContext';
import { ValidAmount } from '../../../utils/validation';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Spacer,
  FormLabel,
  Container,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { User } from '../../../types';
import { TokenInfo } from '../TokenInfo';

export interface MonsterFormProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

interface Values {
  monsterId: string;
}

/**
 * Interface for depositing ETH and receiving wETH
 */
export const MonsterForm: React.FC<MonsterFormProps> = () => {
  //const { injectedProvider } = useInjectedProvider();
  const { currentUser } = useCurrentUser();
  const { contract } = useContract();

  const onFormSubmit = async (values: Values) => {
    // const weiValue = injectedProvider.utils.toWei('' + values.monsterId);
    if (currentUser && contract) {
      try {
        // await contract.methods
        //   .deposit()
        //   .send({ value: weiValue, from: currentUser?.username });
        console.log('getting monster', values);
        //TODO updating balances and typing
        // const updatedUser: User = {
        //   ...currentUser,
        //   ...{
        //     wethBalance: (+currentUser.wethBalance + +values.monsterId).toString(),
        //     ethBalance: (+currentUser.ethBalance - +values.monsterId).toString(),
        //   },
        // };

        // setCurrentUser(updatedUser);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  };

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{ monsterId: '' }}
        validationSchema={ValidAmount}
        onSubmit={async (values: Values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            onFormSubmit(values);
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <FormControl id='monsterForm' isRequired>
              <InputGroup marginBottom='5px'>
                <NumberInput
                  value={values.monsterId}
                  textColor='white'
                  placeholder='Monster Id'
                  precision={0}
                  variant='outline'
                  width='100%'
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue('monsterId', e);
                  }}
                  onBlur={handleBlur}
                  min={0}
                  max={10000}
                >
                  <NumberInputField name='monsterId' borderRightRadius='none' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>

              {touched.monsterId && errors.monsterId ? (
                <div className='error-message'>{errors.monsterId}</div>
              ) : null}
            </FormControl>
            <Button
              variant='solid'
              type='submit'
              size='lg'
              block
              isLoading={isSubmitting}
              loadingText='Submitting'
              width='100%'
            >
              Get Monster
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
