import { render } from "@testing-library/react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { CartProvider } from "../context/cart";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export const renderComponent = (component: React.ReactNode) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CartProvider>
                    {component}
                </CartProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
