import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminRoute from '../../AdminRoute';

const AdminPage = () => <div>Welcome, Admin</div>;
const LoginPage = () => <div>Login Page</div>;

describe('AdminRoute', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // καθαρίζει mocks για κάθε τεστ
    });

    it('renders content for admin users', async () => {
        vi.spyOn(Storage.prototype, 'getItem')
            .mockImplementation((key: string) => {
                if (key === 'token') return 'mock-token';
                if (key === 'role') return 'admin';
                return null;
            });

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Welcome, Admin/i)).toBeInTheDocument();
    });

    it('redirects non-admin users to login', async () => {
        vi.spyOn(Storage.prototype, 'getItem')
            .mockImplementation((key: string) => {
                if (key === 'token') return 'mock-token';
                if (key === 'role') return 'user';
                return null;
            });

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Login Page/i)).toBeInTheDocument();
    });
});
