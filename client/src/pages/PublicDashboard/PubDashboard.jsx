import { render, screen, fireEvent } from "@testing/library";
import PublicDashBoard from "./PublicDashBoard";

test("Guests can see the dashboard along with the sweets as well as any offers", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          sweets: [{ name: "Peda", category: "Indian", price: 50, description: "Soft, spongy milk-based balls soaked in sugar syrup.", quantity: 100 }]
        }),
    })
  );

  render(<PublicDashBoard />);

  expect(await screen.findByText(/peda/i)).toBeInTheDocument();
  expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
  expect(await screen.findByText(/50/i)).toBeInTheDocument();
  expect(await screen.findByText(/Soft, spongy milk-based balls soaked in sugar syrup./i)).toBeInTheDocument();
  expect(await screen.findByText(/100/i)).toBeInTheDocument();
});


