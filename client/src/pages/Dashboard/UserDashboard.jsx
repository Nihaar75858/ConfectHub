import { render, screen, fireEvent } from "@testing/library";
import UserDashboard from "./UserDashboard";
import UserData from "./UserData";
import Sweets from './Sweet';
import SweetSearch from "./SweetSearch";
import PurchaseSweet from "./PurchaseSweet";

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
          sweets: [{ name: "Peda", category: "Indian", price: 50, quantity: 100 }]
        }),
    })
  );

  render(<Sweets />);

  expect(await screen.findByText(/peda/i)).toBeInTheDocument();
  expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
  expect(await screen.findByText(/50/i)).toBeInTheDocument();
  expect(await screen.findByText(/100/i)).toBeInTheDocument();
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


  fireEvent.change(screen.getByPlaceholderText("search"), { target: { value: "Peda" } });
  fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: "Peda" } });
  fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: "Indian" } });
  fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: 50 } });

  expect(await screen.findByText(/Peda/i)).toBeInTheDocument();
  expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
  expect(await screen.findByText(/50/i)).toBeInTheDocument();
  expect(screen.findByText(/Donut/i)).tobeNull();
});

test("Users should be able to press the 'Purchase' button and buy sweets", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(
        { name: "Peda", category: "Indian", price: 50, quantity: 100 },
        { name: "Donut", category: "Western", price: 100, quantity: 0  }),
    })
  );

  if(quantity == 0) purchase = false;

  render(<PurchaseSweet />);


  fireEvent.change(purchase, { target: { value: quantity - bought_quantity } });

  expect(await screen.findByText(/purchase/i)).toBeInTheDocument();
});

