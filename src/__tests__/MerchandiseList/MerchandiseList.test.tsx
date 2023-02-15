import "../../matchMedia.mock"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../../context/cart";
import MerchandiseList from "../../pages/MerchandiseList"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

const MockMerchandiseList = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CartProvider>
                    <MerchandiseList />
                </CartProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

describe("Merchandise List", () => {
    test("should render", () => {
        render(<MockMerchandiseList />)
    })
})

export { }