import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProvidersContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles'

export interface Provider {
  id: string,
  name: string,
  avatar_url: string,
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();

  const { navigate } = useNavigation()

  const navigateToProfile = useCallback(() => {
    //navigate('Profile');
    signOut()
  }, [navigate, signOut]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate])

  useEffect(() => {
    api.get('providers').then(res => {
      setProviders(res.data)
    })
  }, [])

  return <Container >
    <Header>
      <HeaderTitle>
        Bem vindo, {"\n"}
        <UserName>{user.name}</UserName>
      </HeaderTitle>
      <ProfileButton onPress={navigateToProfile}>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </ProfileButton>
    </Header>

    <ProvidersList
      data={providers}
      keyExtractor={provider => provider.id}
      ListHeaderComponent={
        <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
      }
      renderItem={({ item: provider }) => (
        <ProvidersContainer onPress={()=>navigateToCreateAppointment(provider.id)}>
          <ProviderAvatar source={{ uri: provider.avatar_url }} />
          <ProviderInfo>
            <ProviderName>{provider.name}</ProviderName>

            <ProviderMeta>
              <Icon name="calendar" size={14} color="#ff9000" />
              <ProviderMetaText>Segunda à sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
              <Icon name="clock" size={14} color="#ff9000" />
              <ProviderMetaText>8h às 18h</ProviderMetaText>
            </ProviderMeta>
          </ProviderInfo>
        </ProvidersContainer>
      )}
      ListFooterComponent={<ProvidersContainer style={{opacity:0}} />}
    />
  </Container>
};

export default Dashboard;
