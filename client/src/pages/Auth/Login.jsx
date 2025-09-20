import { render, screen, fireEvent } from "@testing/library";
import LoginForm from "/LoginForm";

test("User should add their username and password which are cross-verfied and then logged in", async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText(/Username/), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/), {
    target: { value: "secret123" },
  });
  fireEvent.click(screen.getByText(/Login/));

  const message = await screen.findByText(/Login successful/);
  expect(message).toBeInTheDocument();
});
