import { render, screen } from '@testing-library/react';
import Header from '../components/FBHeader';

test ('renders comment section', () => {
    render(<Header />);
    const text = screen.getByText(/Welcome/i);
    expect(text).toBeInTheDocument();
});



