import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('Calls on Register Button', () => {
  const myFunction= jest.fn();
  render(<App  clickMethod={myFunction}/>);
  fireEvent.click(screen.getByRole('button',{name:/register/i}))
  expect(myFunction).toHaveBeenCalledWith(10);
});
