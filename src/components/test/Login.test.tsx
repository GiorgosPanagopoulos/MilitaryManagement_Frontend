import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import useAuth from '../../context/AuthContext';

// Mock το hook
vi.mock('../../context/AuthContext');

describe('Login Component', () => {
  it('calls login on form submit', async () => {
    const mockLogin = vi.fn();
    (useAuth as any).mockReturnValue({ login: mockLogin });

    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/Κωδικός/i);
    const button = screen.getByRole('button', { name: /Είσοδος/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(button);

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', '123456');
  });
});
