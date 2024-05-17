import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginForm } from './../pages/auth/components/LoginForm';
import { store } from './../redux/store';

describe('LoginForm', () => {
  const setupLoginForm = () => {
    const result = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );
    return { ...result };
  };

  it('Snapshot test for LoginForm: should match snapshot', () => {
    const { asFragment } = setupLoginForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('DOM test use fireEvent function: should enable login button when both user and password has value', () => {
    setupLoginForm();
    const userIdInput = screen.getByLabelText('Employee ID');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /Log In/i });

    expect(loginButton).toBeDisabled();

    fireEvent.change(userIdInput, { target: { value: '12345' } });
    fireEvent.change(passwordInput, { target: { value: 'secret' } });

    expect(loginButton).not.toBeDisabled();
  });

  it('Verify that a user name field, password field, and submit button are present on the page.', () => {
    setupLoginForm();
    const userIdInput = screen.getByLabelText('Employee ID');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /Log In/i });

    expect(userIdInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verify that a user entering an incorrect username or password and clicking submit will see an error on the page.', async () => {
    setupLoginForm();
    const userIdInput = screen.getByLabelText('Employee ID');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(userIdInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText('Incorrect Employee ID or Password');

    expect(errorMessage).toBeInTheDocument();
  });
});
