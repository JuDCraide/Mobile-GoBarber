import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;


export const Title = styled.Text`
  color: #f4ede8;
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-top: 16px;
`;

export const OKButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const OKButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;
