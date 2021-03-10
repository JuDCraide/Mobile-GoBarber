import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/Feather'

import { Container, Title, Description, OKButton, OKButtonText, } from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {

  const { reset } = useNavigation();
  const { params } = useRoute();

  const { date } = params as RouteParams

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, []);

  const formattedDate = useMemo(() => {
    return format(
      date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
      { locale: ptBr })
  }, [date])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OKButton onPress={handleOkPressed}>
        <OKButtonText>Ok</OKButtonText>
      </OKButton>
    </Container>
  )
};

export default AppointmentCreated;
