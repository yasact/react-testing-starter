import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserList from '../../src/components/UserList';

describe('UserList', () => {
    it('should render no users available message when users is empty', () => {
        // Your test code here
        render(<UserList users={[]} />);
        expect(screen.getByText(/no users/i)).toBeInTheDocument();
    });
    it('should render a list of users', () => {
        // Your test code here
        const users = [
            { id: 1, name: 'Mosh' },
            { id: 2, name: 'John' },
        ];
        render(<UserList users={users} />);
        users.forEach((user) => {
            const link = screen.getByRole('link', { name: user.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', `/users/${user.id}`);
        });
    });
})