import "../../matchMedia.mock"
import {renderComponent} from "../../utils/testing";
import MerchandiseList from "../../pages/MerchandiseList";
import '@testing-library/jest-dom'
import { waitForElementToBeRemoved } from "@testing-library/react";
import { getProductsResponse } from "../../utils/fixtures/products";
import Api from "../../services/api"


// jest.mock("../../services/api", () => {
//     return jest.fn().mockImplementation(() => {
//         return {
//             getProducts: () => [] //getProductsResponse
//         }
//     })
// })

jest.mock("../../services/api")


// const api = new Api()

// beforeEach(() => {
//     Api.mockClear()
// })

describe("Merchandise List", () => {

    beforeEach(() => {
        const mockedGetProducts = jest.spyOn(Api.prototype, "getProducts");
        mockedGetProducts.mockImplementation(() => Promise.resolve(getProductsResponse.products));
    })


    test("should render correct items", async () => {
        // api.getProducts.mockResolvedValue(getProductsResponse.products)
        // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

        const screen = renderComponent(<MerchandiseList />)

        // expect that the skeleton loading elements appear
        expect(screen.getByTestId("merchandise-list-skeleton")).toBeInTheDocument()
        
        // expect that the skeleton elements disappear and real data is displayed
        await waitForElementToBeRemoved(screen.getByTestId("merchandise-list-skeleton"))
        
        // screen.debug()
        expect(screen.getByTestId("merchandise-list-grid")).toBeInTheDocument()

        // expect the options to be correctly rendered
        const options = screen.getAllByRole("option").map(options => options.textContent)
        expect(options).toEqual(
            ["All Product Type", "Sticker", "T-shirt", "Lanyard", "Hoodie"]
        )
        
    })
})
