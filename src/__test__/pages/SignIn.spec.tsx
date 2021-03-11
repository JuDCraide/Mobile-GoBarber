import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/SignIn';


jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  };
});

describe('SignInPage', () => {
  it('Should be able to sign in', async () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
