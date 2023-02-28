import "../../matchMedia.mock"
import {renderComponent} from "../../utils/testing";
import '@testing-library/jest-dom'
import { waitFor } from "@testing-library/react";
import Api from "../../services/api"
import { getOrderHistory } from "../../utils/fixtures/orders";
import { OrderHistory } from "../../pages/OrderHistory/OrderHistory";

describe("Merchandise List", () => {
    const mockedGetProducts = jest.spyOn(Api.prototype, "getOrderHistory");
    mockedGetProducts.mockImplementation(() => Promise.resolve(getOrderHistory));
    // beforeEach(() => {
        
    // })


    test("should render history page after fetching data", async () => {
        const screen = renderComponent(<OrderHistory />)
        
        // expect loading screen
        const loadingText = screen.getByTestId("loading-screen-text")
        expect(loadingText.textContent).toBe("Fetching your past purchase")

        // expect that real data is displayed after successful fetch
        await waitFor(() => {
            expect(screen.getByTestId("order-history")).toBeInTheDocument()
            expect(loadingText).not.toBeInTheDocument()
        })
    })
})
