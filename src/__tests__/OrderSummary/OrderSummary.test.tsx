import "../../matchMedia.mock"
import {renderComponent} from "../../utils/testing";
import '@testing-library/jest-dom'
import { waitFor } from "@testing-library/react";
import Api from "../../services/api"
import { OrderSummary } from "../../pages/OrderSummary/OrderSummary";
import { getOrderResponses } from "../../utils/fixtures/orders";

jest.mock("../../services/api")

describe("Merchandise List", () => {
    const mockedGetProducts = jest.spyOn(Api.prototype, "getOrder");
    mockedGetProducts.mockImplementation(() => Promise.resolve(getOrderResponses));
    // beforeEach(() => {
        
    // })


    test("should render summary page after fetching data", async () => {
        const screen = renderComponent(<OrderSummary />)
        
        // expect loading screen
        const loadingText = screen.getByTestId("loading-screen-text")
        expect(loadingText.textContent).toBe("Fetching order detail")

        // expect that real data is displayed after successful fetch
        await waitFor(() => {
            expect(screen.getByTestId("order-summary")).toBeInTheDocument()
            expect(loadingText).not.toBeInTheDocument()
        })
    })

    test("should render correct details of order sumamry", async () => {
        const screen = renderComponent(<OrderSummary />)

        // fetch data
        await waitFor(() => {
            expect(screen.getByTestId("order-summary")).toBeInTheDocument()
        })

        // order id
        const orderNumber = screen.getByTestId("order-id")
        expect(orderNumber.textContent).toBe("1234567891023456")

        // order status
        expect(screen.getByTestId("order-status").textContent).toBe("Item Delayed")

        // subtotal, voucher, discount
        expect(screen.getByTestId("subtotal-text").textContent).toBe(" $1.35")
        expect(screen.getByTestId("voucher-text").textContent).toBe("$0.15")
        expect(screen.getByTestId("total-text").textContent).toBe("$1.10")

    })

    test("should redirect to home page on click continue shopping", async () => {
        const screen = renderComponent(<OrderSummary />)

        // fetch data
        await waitFor(() => {
            expect(screen.getByTestId("order-summary")).toBeInTheDocument()
        })

        const continueButton = screen.getByTestId("continue-shopping-btn")
        expect(continueButton.textContent).toBe("CONTINUE SHOPPING")

        // TODO: click event should redirect to home

    })
    

    test("should display correct order items and qr code", async () => {
        const screen = renderComponent(<OrderSummary />)

        // fetch data
        await waitFor(() => {
            expect(screen.getByTestId("order-summary")).toBeInTheDocument()
        })

        // order items
        const orderItems = screen.getAllByTestId("order-item")
        expect(orderItems).toHaveLength(2)

        // qr code
    })

    test("should return Error404 if order state not found", async () => {
        const screen = renderComponent(<OrderSummary />)
        mockedGetProducts.mockImplementation(() => Promise.resolve(null));    

        // expect error 404 
        const headingElement = screen.getByText(/Error 404/i);
        expect(headingElement).toBeInTheDocument();
    })
})
