import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartEmptyView from "../../pages/Cart/CartEmptyView";
import { BrowserRouter } from "react-router-dom";

const MockCart = () => {
    return <BrowserRouter>
        <CartEmptyView />
    </BrowserRouter>
}
describe("CartEmptyView", () => {
    test("should have heading 'No items in your cart'", async () => {
        render(<MockCart />);
        const headingElement = screen.getByText(/No items in your cart/i);
        expect(headingElement).toBeInTheDocument();
    });

    test("should have button 'Continue Shopping'", async () => {
        render(<MockCart />);
        const buttonElement = screen.getByText(/Continue Shopping/i);
        expect(buttonElement).toBeInTheDocument();
    });
});
