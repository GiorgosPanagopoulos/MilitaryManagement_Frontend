import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PersonnelList from '.././personnel/PersonnelList';
import { Personnel } from '../../types/Personnel';

describe('PersonnelList', () => {
    const mockPersonnel: Personnel[] = [
        {
            _id: '1',
            firstName: 'Γιάννης',
            lastName: 'Παπαδόπουλος',
            rank: 'Σμηνίας',
            serviceNumber: '12345',
            phone: '2101234567',
            email: 'giannis@example.com',
            unit: '123 Μοίρα',
        },
    ];

    const mockDelete = vi.fn();
    const mockEdit = vi.fn();

    it('renders personnel info correctly', () => {
        render(<PersonnelList data={mockPersonnel} onDelete={mockDelete} onEdit={mockEdit} />);

        expect(screen.getByText(/Γιάννης Παπαδόπουλος/)).toBeInTheDocument();
        expect(screen.getByText(/Σμηνίας/)).toBeInTheDocument();
        expect(screen.getByText(/123 Μοίρα/)).toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', () => {
        render(<PersonnelList data={mockPersonnel} onDelete={mockDelete} onEdit={mockEdit} />);

        const deleteButton = screen.getByTitle('Διαγραφή');
        fireEvent.click(deleteButton);
        expect(mockDelete).toHaveBeenCalledWith('1');
    });

    it('calls onEdit when edit button is clicked', () => {
        render(<PersonnelList data={mockPersonnel} onDelete={mockDelete} onEdit={mockEdit} />);

        const editButton = screen.getByTitle('Επεξεργασία');
        fireEvent.click(editButton);
        expect(mockEdit).toHaveBeenCalledWith(mockPersonnel[0]);
    });

    it('renders message when list is empty', () => {
        render(<PersonnelList data={[]} onDelete={mockDelete} onEdit={mockEdit} />);
        expect(screen.getByText(/Δεν υπάρχει καταχωρημένο προσωπικό/i)).toBeInTheDocument();
    });
});
