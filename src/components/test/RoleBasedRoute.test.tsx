import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminPage = () => <div>Admin Only</div>;
const AccessDenied = () => <div>Access Denied</div>;

const RoleBasedRoute = ({
                          children,
                          allowedRole,
                        }: {
  children: JSX.Element;
  allowedRole: string;
}) => {
  const { role } = React.useContext(AuthContext);

  if (role !== allowedRole) {
    return <AccessDenied />;
  }

  return children;
};

describe('RoleBasedRoute', () => {
  it('allows access to correct role', () => {
    render(
        <AuthContext.Provider
            value={{
              token: 'abc',
              role: 'admin',
              email: 'admin@example.com',
              isLoading: false,
              login: vi.fn(),
              logout: vi.fn(),
            }}
        >
          <MemoryRouter initialEntries={['/admin']}>
            <Routes>
              <Route
                  path="/admin"
                  element={
                    <RoleBasedRoute allowedRole="admin">
                      <AdminPage />
                    </RoleBasedRoute>
                  }
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
    );

    expect(screen.getByText(/Admin Only/i)).toBeInTheDocument();
  });

  it('denies access to incorrect role', () => {
    render(
        <AuthContext.Provider
            value={{
              token: 'abc',
              role: 'user',
              email: 'user@example.com',
              isLoading: false,
              login: vi.fn(),
              logout: vi.fn(),
            }}
        >
          <MemoryRouter initialEntries={['/admin']}>
            <Routes>
              <Route
                  path="/admin"
                  element={
                    <RoleBasedRoute allowedRole="admin">
                      <AdminPage />
                    </RoleBasedRoute>
                  }
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
    );

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });
});
