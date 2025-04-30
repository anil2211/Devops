import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../components/Login';

test('Login component', () => {
  render(<Login/>);
  const linkElement = screen.getByText(/login component/i);

  expect(linkElement).toBeInTheDocument();
});


test('renders form with labels', () => {
    render(<Login/>);
    const label1 = screen.getByLabelText(/email/i);
    const label2 = screen.getByLabelText(/password/i);

    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
  });

  
test('call onsubmit function ', () => {
    const mockFunction=jest.fn();
    render(<Login onSubmit={mockFunction}/>);
    
    const button=screen.getByRole('button',{name:/login/i})
    fireEvent.click(button);

    expect(mockFunction).toHaveBeenCalled();
    // expect(mockFunction).toHaveBeenCalledWith({email:"test",password:"test"});
  });


  test('call onsubmit with email and password ', () => {
    const mockEmail="test@gmail.com";
    const mockPassword="test@123"
    const mockFunction=jest.fn();
    render(<Login onSubmit={mockFunction}/>);
    //read the label and mock the data  into input field
    const label1 = screen.getByLabelText(/email/i);
    fireEvent.change(label1,{target:{value:mockEmail}})

    const label2 = screen.getByLabelText(/password/i);
    fireEvent.change(label2,{target:{value:mockPassword}})
    
    const button=screen.getByRole('button',{name:/login/i})
    fireEvent.click(button);

    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith({email:mockEmail,password:mockPassword});
  });
