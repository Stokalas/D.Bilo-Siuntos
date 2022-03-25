import { render, screen } from '@testing-library/react';

import { DateDisplay } from '../../components/DateDisplay';

test('renders current date', () => {
  //Random test, don't mind me
  render(<DateDisplay />);
  const timeFormat = screen.getByText(/GMT/i);
  expect(timeFormat).not.toBeInTheDocument();
});
