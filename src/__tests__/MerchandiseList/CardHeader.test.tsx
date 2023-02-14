import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartHeader from "../../pages/Cart/CartHeader";

describe("Cart Header", () => {
	test("should have a header with text 'Product'", () => {
		render(<CartHeader />);
		const headings = screen.getByText(/product/i);
		expect(headings).toBeInTheDocument();
	});

	test("should have headers 'Unit Price', 'Quantity', 'Subtotal', 'Action'", () => {
		render(<CartHeader />);
		const headings = screen.getAllByTestId("cart-header-2");
		expect(headings.map(heading => heading.textContent)).toEqual([
			"Unit Price",
			"Quantity",
			"Subtotal",
			"Action",
		]);
	});
});

export {};
