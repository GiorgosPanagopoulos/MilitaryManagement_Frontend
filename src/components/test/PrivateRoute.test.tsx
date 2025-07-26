import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../PrivateRoute';
import { AuthContext } from '../../context/AuthContext';

const DummyComponent = () => <div>Protected Page</div>;

describe('PrivateRoute', () => {
    it('redirects to login if user is not authenticated', () => {
        render(
            <AuthContext.Provider
                value={{
                    token: null,
                    role: null,
                    email: null,
                    isLoading: false,
                    login: vi.fn(),
                    logout: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={
                                <PrivateRoute>
                                    <DummyComponent />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<div>Login Page</div>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });

    it('renders protected content if user is authenticated', () => {
        render(
            <AuthContext.Provider
                value={{
                    token: 'valid-token',
                    role: 'user',
                    email: 'test@example.com',
                    isLoading: false,
                    login: vi.fn(),
                    logout: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={
                                <PrivateRoute>
                                    <DummyComponent />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Protected Page/i)).toBeInTheDocument();
    });
});
