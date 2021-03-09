import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index';

interface ProvidersContainerProps {
  selected?: boolean;
}

interface ProvidersNameProps {
  selected?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 120px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProvidersContainer = styled(RectButton)<ProvidersContainerProps>`
  background: ${(props) => (props.selected ? '#ff9000' :'#3e3b47')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 10px;
`;

export const ProviderName = styled.Text<ProvidersNameProps>`
  color: ${(props) => (props.selected ? '#232129' :'#f4ede8')};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;