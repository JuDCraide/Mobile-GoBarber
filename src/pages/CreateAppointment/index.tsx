import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';

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
  ProviderName
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

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string)=>{
    setSelectedProvider(id);
  },[setSelectedProvider])

  useEffect(() => {
    api.get('providers').then(res => {
      setProviders(res.data)
    })
  }, [])

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
            onPress={()=>handleSelectProvider(provider.id)}
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
  </Container>
};

export default CreateAppointment;
