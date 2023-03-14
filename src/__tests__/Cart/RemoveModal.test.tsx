import { fireEvent } from "@testing-library/react";
import { renderComponent } from "../../utils/testing";
import '@testing-library/jest-dom'
import RemoveModal from "../../pages/Cart/RemoveModal";
import "../../matchMedia.mock"


describe("CheckoutForm Test", () => {

    test("should render the questions whether to remove product", async () => {
        const screen = renderComponent(
            <RemoveModal
            isOpen
            onClose = {jest.fn()}
            removeItem = {jest.fn()} />)

        const headingElement = screen.getByText(/Do you want to remove this product?/i);
        expect(headingElement).toBeInTheDocument();

    })

    test("should render yes and no button", async () => {
        const screen = renderComponent(
            <RemoveModal
                isOpen
                onClose = {jest.fn()}
                removeItem = {jest.fn()} />)
        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements.length).toBe(2);
    })
})
