import {render, screen, fireEvent} from "@testing/library";
import Register from './register';

test("Renders register form and store user credentials in the database", () => {
  render(<Register />)

  const firstNameInput = screen.getByPlaceholderText("firstName");
  const lastNameInput = screen.getByPlaceholderText("lastName");
  const emailInput = screen.getByPlaceholderText("email");
  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button", { name: /register/i });

  fireEvent.change(firstNameInput, { target: { value: "firstName" } });
  fireEvent.change(lastNameInput, { target: { value: "lastName" } });
  fireEvent.change(emailInput, { target: { value: "user@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "secret" } });
  fireEvent.change(usernameInput, { target: { value: "John" } });

  fireEvent.click(button);

  expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
})