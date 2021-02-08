import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  border-color: #FF0000;
  border-width:1px;
  height: 60px;
  background: #FF9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #312E38;
  font-family: 'RobotoSlab-Medium';
`;
