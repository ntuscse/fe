import { fireEvent } from "@testing-library/react";
import { renderComponent } from "../../utils/testing";
import '@testing-library/jest-dom'
import Api from "../../services/api"
import CheckoutForm from "../../pages/Checkout/CheckoutForm"

describe("CheckoutForm Test", () => {

    test("should render contact information", async () => {
        const screen = renderComponent(<CheckoutForm email=""  />)
        //screen.debug();
        const headingElement = screen.getByText(/Contact information/i);
        expect(headingElement).toBeInTheDocument();

    })

    test("should render textbox for entering email", async () => {
        const screen = renderComponent(<CheckoutForm email=""  />)
        //screen.debug();

        const inputElement = screen.getByPlaceholderText("Email");

        expect(inputElement).toBeVisible();

    })

    test("the textbox should render text after entering text", async () => {
        const screen = renderComponent(<CheckoutForm email=""  />)
        const inputElement = screen.getByPlaceholderText("Email");
        fireEvent.change(inputElement, { target:{ value:"example@gmail.com" } });
        expect(inputElement).toHaveValue("example@gmail.com");
    })
    /*test("should render Next button", async () => {
        const screen = renderComponent(<CheckoutForm email=""  />)

        const headingElement = screen.getByText(/Next/i);
        expect(headingElement).toBeInTheDocument();

    })*/
})
