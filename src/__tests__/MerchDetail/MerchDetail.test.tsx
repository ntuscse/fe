import "../../matchMedia.mock"
import { renderComponent } from "../../utils/testing";
import MerchDetail from "../../pages/MerchDetail";
import '@testing-library/jest-dom'
import Api from "../../services/api";
import { getProductResponse } from "../../utils/fixtures/products";
import { waitForElementToBeRemoved } from "@testing-library/react";

jest.mock("../../services/api")

describe("MerchDetail", async () => {

    beforeEach(() => {
        const mockedGetProduct = jest.spyOn(Api.prototype, "getProduct");
        mockedGetProduct.mockImplementation(() => Promise.resolve(getProductResponse));
    })

    test("should render correct detail", async () => {
        // api.getProducts.mockResolvedValue(getProductsResponse.products)
        // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

        const screen = renderComponent(<MerchDetail />)

        // expect that the skeleton loading elements appear
        expect(screen.getByTestId("merch-list-skeleton")).toBeInTheDocument();
        
        // expect that the skeleton elements disappear and real data is displayed
        await waitForElementToBeRemoved(screen.getByTestId("merch-list-skeleton"))
        
        screen.debug()
    })
})
