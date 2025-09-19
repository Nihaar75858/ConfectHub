import { render, screen, fireEvent } from "@testing/library";
import UserDashboard from "./UserDashboard";
import UserData from "./UserData";
import Sweets from './Sweet';
import SweetSearch from "./SweetSearch";

test("User Dashboard shows the authenticated users their data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "John Doe",
          email: "user@example.com",
        }),
    })
  );

  render(<UserData />);

  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/user@example.com/i)).toBeInTheDocument();
});

test("Users should be able to view all sweets in the inventory", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          sweets: [{ name: "Peda", category: "Indian", price: 50 }]
        }),
    })
  );

  render(<Sweets />);

  expect(await screen.findByText(/peda/i)).toBeInTheDocument();
});

test("Users should be able to search and filter sweets", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(
        { name: "Peda", category: "Indian", price: 50 },
        { name: "Donut", category: "Western", price: 100 }),
    })
  );

  render(<SweetSearch />);

  const name = screen.getByPlaceholderText("name");
  const category = screen.getByPlaceholderText("category");
  const price = screen.getByPlaceholderText("price");

  fireEvent.change(name, { target: { value: "name" } });
  fireEvent.change(category, { target: { value: "category" } });
  fireEvent.change(price, { target: { value: "price" } });
  fireEvent.change(screen.getByPlaceholderText("search"), { target: { value: "Peda" } });

  expect(await screen.findByText(/Peda/i)).toBeInTheDocument();
  expect(screen.findByText(/Donut/i)).tobeNull();
});
