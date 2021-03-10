import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import { Container, Title, Description, OKButton, OKButtonText, } from './styles';

const AppointmentCreated: React.FC = () => {

  const { reset } = useNavigation();

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>, dia de de às </Description>
      <OKButton onPress={handleOkPressed}>
        <OKButtonText>Ok</OKButtonText>
      </OKButton>
    </Container>
  )
};

export default AppointmentCreated;
