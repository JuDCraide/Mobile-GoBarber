import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';

import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProvidersContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './style';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string,
  name: string,
  avatar_url: string,
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const { providerId } = route.params as RouteParams;

  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDayPicker(value => !value);
  }, []);

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDayPicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  }, [])

  useEffect(() => {
    api.get('providers').then(res => {
      setProviders(res.data)
    })
  }, []);

  return <Container>
    <Header>
      <BackButton onPress={navigateBack}>
        <Icon name="chevron-left" size={24} color="#999591" />
      </BackButton>
      <HeaderTitle>Cabeleireiros</HeaderTitle>
      <UserAvatar source={{ uri: user.avatar_url }} />
    </Header>
    <ProvidersListContainer>
      <ProvidersList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <ProvidersContainer
            selected={provider.id === selectedProvider}
            onPress={() => handleSelectProvider(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderName
              selected={provider.id === selectedProvider}
            >{provider.name}</ProviderName>
          </ProvidersContainer>
        )}
        ListFooterComponent={<ProvidersContainer style={{ opacity: 0 }} />}
      />
    </ProvidersListContainer>
    <Calendar>
      <CalendarTitle>Escolha a data</CalendarTitle>
      <OpenDatePickerButton onPress={handleToggleDatePicker}>
        <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
      </OpenDatePickerButton>
      {showDayPicker &&
        <DateTimePicker
          value={selectedDate}
          {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })} // < nessa linha
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          onChange={handleDateChanged}
        />
      }
    </Calendar>
  </Container>
};

export default CreateAppointment;
