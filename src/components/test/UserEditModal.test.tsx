import { render, screen, fireEvent } from '@testing-library/react';
import UserEditModal from '../../components/UserEditModal';
import { vi } from 'vitest';

test('opens modal and allows user edit', () => {
  const handleSubmit = vi.fn((e) => e.preventDefault());
  const handleClose = vi.fn();
  const setEditData = vi.fn();

  render(
      <UserEditModal
          editingUser={{ _id: 'u1', email: 'old@mail.mil', role: 'user' }}
          editData={{ email: 'old@mail.mil', password: '' }}
          setEditData={setEditData}
          onClose={handleClose}
          onSubmit={handleSubmit}
      />
  );

  // Ελέγχει ότι το email φαίνεται
  expect(screen.getByDisplayValue('old@mail.mil')).toBeInTheDocument();

  // Αλλάζει το password
  fireEvent.change(screen.getByPlaceholderText('Νέος Κωδικός (προαιρετικό)'), {
    target: { value: '123456' },
  });

  // Υποβολή
  fireEvent.click(screen.getByText(/Αποθήκευση/i));

  // Πρέπει να έχει κληθεί η handleSubmit
  expect(handleSubmit).toHaveBeenCalled();
});
