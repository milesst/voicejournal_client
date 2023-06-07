import { getByTestId, getByText, render, screen } from '@testing-library/react';
import App from './Components/App';
import LoginPage from './Login/LoginPage';

test('renders learn react link', () => {
  render(<LoginPage />);
  expect((screen.getByText('Войти'))).toBeInTheDocument();
});
