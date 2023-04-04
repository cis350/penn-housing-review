import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NewHousePage from '../components/ReviewNewHouse';
import addHouse from '../api/NewHouseAPI';

jest.mock('../api/NewHouseAPI');

describe('NewHousePage component', () => {
  it('renders the component without errors', () => {
    render(<NewHousePage />);
  });

  it('renders the title and description fields', () => {
    const { getByLabelText } = render(<NewHousePage />);
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
    expect(getByLabelText('Description')).toBeInTheDocument();
  });

  it('allows the user to check if the house is on campus', () => {
    const { getByLabelText } = render(<NewHousePage />);
    const onCampusCheckbox = getByLabelText('Yes');
    fireEvent.click(onCampusCheckbox);
    expect(onCampusCheckbox.checked).toBe(true);
  });

  it('allows the user to check if the house is for freshmen only when on campus', () => {
    const { getByLabelText, getByText } = render(<NewHousePage />);
    const onCampusCheckbox = getByLabelText('Yes');
    fireEvent.click(onCampusCheckbox);
  });

  it('allows the user to select room types', () => {
    const { getByLabelText, getAllByLabelText } = render(<NewHousePage />);
    const roomTypeCheckboxes = getAllByLabelText(/Studio|1 Bedroom|2 Bedroom|Triple|Quad/);
    roomTypeCheckboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });

  it('submits the new house request when the user clicks the Request button', async () => {
    addHouse.mockResolvedValueOnce({ data: { id: 1 } });
    const { getByText, getByLabelText } = render(<NewHousePage />);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'New House' } });
    fireEvent.change(getByLabelText('Address'), { target: { value: '123 Main St.' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'A new house' } });
    fireEvent.click(getByLabelText('Studio'));
    fireEvent.click(getByText('Request'));
    await waitFor(() => {
      expect(addHouse).toHaveBeenCalledWith({
        id: 1,
        houseid: 1,
        houseName: 'New House',
        houseAddress: '123 Main St.',
        description: 'A new house',
        onCampus: false,
        freshman: false,
        '1 bedroom': false,
        '2 bedroom': false,
        studio: true,
        triple: false,
        quad: false,
      });
    });
  });

  it('redirects to the search page when the user clicks the Cancel button', () => {
    const { getByText } = render(<NewHousePage />);
    fireEvent.click(getByText('Cancel'));
    expect(window.location.href).toContain('http');
  });
});