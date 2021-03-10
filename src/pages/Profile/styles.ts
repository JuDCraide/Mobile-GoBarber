import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding:  0px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 24px;
`;

export const Title = styled.Text`
  font-size:  20px;
  color: #F4EDE8;
  font-family:  'RobotoSlab-Medium';
  margin:  24px 0 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  width: 152px;
  height: 152px;
  margin-top: 140px;
  align-self: center;
`;

export const UserAvatar = styled.Image`
  width: 152px;
  height: 152px;
  border-radius: 98px;
`;

