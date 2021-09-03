import React from 'react';

import { Formik, Form } from 'formik';
// import { useInjectedProvider } from '../../../contexts/injectedProviderContext';
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
  Container,
  InputGroup,
} from '@chakra-ui/react';
// import { User } from '../../../types';
// import { TokenInfo } from '../TokenInfo';

export interface EncounterFormProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

interface Values {
  encounterId: string;
}

/**
 * Interface for depositing ETH and receiving wETH
 */
export const EncounterForm: React.FC<EncounterFormProps> = () => {
  //const { injectedProvider } = useInjectedProvider();
  const { currentUser } = useCurrentUser();
  const { contract } = useContract();

  const onFormSubmit = async (values: Values) => {
    // const weiValue = injectedProvider.utils.toWei('' + values.encounterId);
    if (currentUser && contract) {
      try {
        // await contract.methods
        //   .deposit()
        //   .send({ value: weiValue, from: currentUser?.username });
        console.log('getting encounter', values);
        //TODO updating balances and typing
        // const updatedUser: User = {
        //   ...currentUser,
        //   ...{
        //     wethBalance: (+currentUser.wethBalance + +values.encounterId).toString(),
        //     ethBalance: (+currentUser.ethBalance - +values.encounterId).toString(),
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
        initialValues={{ encounterId: '' }}
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
                  value={values.encounterId}
                  textColor='white'
                  placeholder='Monster Id'
                  precision={0}
                  variant='outline'
                  width='100%'
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue('encounterId', e);
                  }}
                  onBlur={handleBlur}
                  min={0}
                  max={10000}
                >
                  <NumberInputField
                    name='encounterId'
                    borderRightRadius='none'
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>

              {touched.encounterId && errors.encounterId ? (
                <div className='error-message'>{errors.encounterId}</div>
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
              Get Encounter Map
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
