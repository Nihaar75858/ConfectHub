import { render, screen, fireEvent } from "@testing/library";
import AdminDashBoard from "./AdminDashBoard";
import UserData from "./UserData";
import ViewSweets from './ViewSweets';
import SweetForm from "./SweetForm";
import UpdateSweet from "./UpdateSweet";
import DeleteSweet from "./DeleteSweet";

test("Admin Dashboard is only shown to those who have admin role", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "Admin",
          email: "user@admin.com",
        }),
    })
  );

  if (role == "admin") allow;
  else reject;

  render(<AdminDashBoard />);

  expect(await screen.findByText(/Admin/i)).toBeInTheDocument();
  expect(await screen.findByText(/user@admin.com/i)).toBeInTheDocument();
});

test("Admin can see all the users on the site", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () =>
            Promise.resolve({
                users: users
            }),
        })
    );

    render(<UserData />);

    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/user@example.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/John/i)).toBeInTheDocument();
})

test("Admin can create sweets", async () => {
  render(<SweetForm />);

  fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "Peda" } });
  fireEvent.change(screen.getByPlaceholderText("category"), { target: { value: "Traditional Sweet" } });
  fireEvent.change(screen.getByPlaceholderText("quantity"), { target: { value: 100 } });
  fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "Soft, spongy milk-based balls soaked in sugar syrup." } });
  fireEvent.change(screen.getByPlaceholderText("price"), { target: { value: 120 } });

  expect(await screen.findByText(/Peda/i)).toBeInTheDocument();
  expect(await screen.findByText(/Traditional Sweet/i)).toBeInTheDocument();
  expect(await screen.findByText(/Soft, spongy milk-based balls soaked in sugar syrup./i)).toBeInTheDocument();
  expect(screen.findByText(/120/i)).tobeNull();
});

test("Admin can view sweets", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          sweets: [{ name: "Peda", category: "Indian", price: 50, description: "Soft, spongy milk-based balls soaked in sugar syrup.", quantity: 100 }]
        }),
    })
  );

  render(<ViewSweets />);

  expect(await screen.findByText(/peda/i)).toBeInTheDocument();
  expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
  expect(await screen.findByText(/50/i)).toBeInTheDocument();
  expect(await screen.findByText(/Soft, spongy milk-based balls soaked in sugar syrup./i)).toBeInTheDocument();
  expect(await screen.findByText(/100/i)).toBeInTheDocument();
});

test("Admin should be update and delete sweets", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(
        { name: "Peda", category: "Indian", price: 50, quantity: 100 },
        { name: "Donut", category: "Western", price: 100, quantity: 0  }),
    })
  );

  if(Admin.click == 'UPDATE') {
    render(<UpdateSweet />);

    fireEvent.change(restock, { target: { value: quantity + added_quantity } });

    expect(await screen.findByText(/restock/i)).toBeInTheDocument();
  }

  if(Admin.click == 'DELETE') {
    render(<DeleteSweet />);

    fireEvent.change(delete, { target: sweet });

    expect(await screen.findByText(/sweet deleted/i)).toBeInTheDocument();
  }
});