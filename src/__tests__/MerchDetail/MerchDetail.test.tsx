import "../../matchMedia.mock"
import { renderComponent } from "../../utils/testing";
import MerchDetail from "../../pages/MerchDetail";
import '@testing-library/jest-dom'
import Api from "../../services/api";
import { getProductResponse } from "../../utils/fixtures/products";
import { getByText, waitForElementToBeRemoved } from "@testing-library/react";

jest.mock("../../services/api")

jest.mock("../../pages/MerchDetail/MerchCarousel", () => () => null)

describe("MerchDetail", () => {

    beforeEach(() => {
        jest.clearAllMocks()
        const mockedGetProduct = jest.spyOn(Api.prototype, "getProduct");
        mockedGetProduct.mockImplementation(() => Promise.resolve(getProductResponse));
    })

    test("should fetch data successfully", async () => {
        const screen = renderComponent(<MerchDetail />)

        // expect that the skeleton loading elements appear
        expect(screen.getByTestId("merch-list-skeleton")).toBeInTheDocument();
        
        // expect that the skeleton elements disappear and real data is displayed
        await waitForElementToBeRemoved(screen.getByTestId("merch-list-skeleton"))
        
        expect(screen.getByTestId("merch-list-grid")).toBeInTheDocument()


    })

    test("should render correct details", async () => {
        const screen = renderComponent(<MerchDetail />)

        expect(screen.getByTestId("merch-list-grid")).toBeInTheDocument()
        
        const titleText = screen.getByTestId("title-text")
        expect(titleText).toBeInTheDocument()
        expect(titleText.textContent).toEqual("SCSE Standard T-shirt")

        const priceText = screen.getByTestId("price-text")
        expect(priceText).toBeInTheDocument()
        expect(priceText.textContent).toEqual("$12.00")

        // sizes
        const sizeText = screen.getByText(/sizes/i)
        expect(sizeText).toBeInTheDocument()
        const sizesOption = screen.getAllByTestId("sizes-text").map(size => size.textContent)
        expect(sizesOption).toEqual(
            ["S", "M", "XL"]
        )

        // colors
        const colorsText = screen.getByText(/colors/i)
        expect(colorsText).toBeInTheDocument()
        const colorsOptions = screen.getAllByTestId("colors-text").map(colors => colors.textContent)
        expect(colorsOptions).toEqual(
            ["BlackWhiteNavy"]
        )

        // quantity
        const quantityText = screen.getByText(/quantity/i)
        expect(quantityText).toBeInTheDocument()
        // "stock": [[0, 1, 2, 3, 4, 3, 2, 1], [1, 2, 3, 4, 5, 4, 3, 2], [0, 1, 2, 3, 4, 3, 2, 1]]
    })
})
