import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';
import { format } from 'date-fns';

import { Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProvidersContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  ScheduleTitle,
  Section,
  SectionsContent,
  SectionTitle,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './style';


interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string,
  name: string,
  avatar_url: string,
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const { providerId } = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
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
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      })
      navigate('AppointmentCreated', { date: date.getTime() })
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um um erro ao criar o agendamento, tente novamente',
      )
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  useEffect(() => {
    api.get('providers').then(res => {
      setProviders(res.data)
    });
  }, []);

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(res => {
      setAvailability(res.data)
      console.log(res.data);
    })
  }, [selectedDate, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(available => {
        return available.hour < 12;
      })
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
      .sort((a1, a2) => {
        return a1.hour - a2.hour;
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(available => {
        return available.hour >= 12;
      })
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
      .sort((a1, a2) => {
        return a1.hour - a2.hour;
      });
  }, [availability]);

  return <Container>
    <Header>
      <BackButton onPress={navigateBack}>
        <Icon name="chevron-left" size={24} color="#999591" />
      </BackButton>
      <HeaderTitle>Cabeleireiros</HeaderTitle>
      <UserAvatar source={{ uri: user.avatar_url }} />
    </Header>
    <Content>
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
      <Schedule>
        <ScheduleTitle>Escolha o hor??rio</ScheduleTitle>
        <Section>
          <SectionTitle>Morning</SectionTitle>
          <SectionsContent>
            {morningAvailability.map(({ hourFormatted, available, hour }) => (
              <Hour enabled={available} available={available} selected={selectedHour === hour} onPress={() => handleSelectHour(hour)} key={hourFormatted}>
                <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionsContent>
        </Section>
        <Section>
          <SectionTitle>Afternoon</SectionTitle>
          <SectionsContent>
            {afternoonAvailability.map(({ hourFormatted, available, hour }) => (
              <Hour enabled={available} available={available} selected={selectedHour === hour} onPress={() => handleSelectHour(hour)} key={hourFormatted}>
                <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionsContent>
        </Section>
      </Schedule>
      <CreateAppointmentButton onPress={handleCreateAppointment}>
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
    </Content>
  </Container>
};

export default CreateAppointment;
