import "../../matchMedia.mock"
import { QueryClient } from "@tanstack/react-query"
import {renderComponent} from "../../utils/testing";
import MerchandiseList from "../../pages/MerchandiseList";
import '@testing-library/jest-dom'
import { waitForElementToBeRemoved } from "@testing-library/react";
import { getProductsResponse } from "../../utils/fixtures/products";
import { Api } from "../../services/api"

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

jest.mock("../../services/api", () => {
    return jest.fn().mockImplementation(() => {
        return {
            getProducts: () => [] //getProductsResponse
        }
    })
})

// beforeEach(() => {
//     Api.mockClear()
// })

describe("Merchandise List", () => {
    test("should render", () => {
        // const api = new Api();
        // api.getProducts.mockResolvedValue(getProductsResponse.products)

        const screen = renderComponent(<MerchandiseList />)

        // screen.debug()

        // expect that the skeleton loading elements appear
        expect(screen.getByTestId("merchandise-list-skeleton")).toBeInTheDocument()

        // expect that the skeleton elements disappear and real data is displayed
        waitForElementToBeRemoved(screen.getByTestId("merchandise-list-skeleton"))

        expect(screen.getByTestId("merchandise-list-grid")).toBeInTheDocument()

    })
})
