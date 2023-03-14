import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../../pages/Cart/CartItem";
import { CartItemType } from "../../typings/cart";
import { ProductType } from "../../typings/product";

const mockedFunction = jest.fn();

const tempProduct: ProductType = {
    id: "SCSE-1",
    name: "Graphic Stickers",
    price: 1000,
    stock: [[2,2]], // stock[colorway][size] = qty
    sizes: ["M","L"],
    colorways: ["Blue"],
    isAvailable: true
};

const tempData: CartItemType = {
    productId: "SCSE-1",
    size:"M",
    colorway:"Blue",
    quantity: 1
};
describe("Cart Item", () => {
    describe("not MobileView", () => {
        beforeEach( () => {
            render(<CartItem
                isLoading={false}
                isMobile = {false}
                data = {tempData}
                onRemove = {mockedFunction}
                onQuantityChange = {mockedFunction}
                productInfo = {tempProduct}
            />);
        })
        test("should have render text 'size'", async () => {
            const textElement = screen.getByText(/Size:/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'color'", async () => {
            const textElement = screen.getByText(/Color:/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'M'", async () => {
            const textElement = screen.getByText(/M/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'Blue'", async () => {
            const textElement = screen.getByText(/Blue/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'Graphic Stickers'", async () => {
            const textElement = screen.getByText(/Graphic Stickers/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render price '$10'", async () => {
            const textElement = screen.getByTestId("unit-price");
            expect(textElement.textContent).toMatch("$10.00");
        });

        test("should have render stock number '2'", async () => {
            const textElement = screen.getByText(/In stock/i);
            expect(textElement).toHaveTextContent("2");
        });

        test("should have render delete button", async () => {
            const textElement = screen.getByText(/Delete/i);
            expect(textElement).toBeInTheDocument();
        });
    })
    describe("MobileView", () => {
        beforeEach( () => {
            render(<CartItem
                isLoading={false}
                isMobile
                data = {tempData}
                onRemove = {mockedFunction}
                onQuantityChange = {mockedFunction}
                productInfo = {tempProduct}
            />);
        })
        test("should have render text 'size'", async () => {
            const textElement = screen.getByText(/Size:/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'color'", async () => {
            const textElement = screen.getByText(/Color:/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'M'", async () => {
            const textElement = screen.getByText(/M/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'Blue'", async () => {
            const textElement = screen.getByText(/Blue/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render text 'Graphic Stickers'", async () => {
            const textElement = screen.getByText(/Graphic Stickers/i);
            expect(textElement).toBeInTheDocument();
        });

        test("should have render price '$10'", async () => {
            const textElement = screen.getByTestId("mobile-unit-price");
            expect(textElement.textContent).toMatch("$10.00");
        });

        test("should have render stock number '2'", async () => {
            const textElement = screen.getByText(/In stock/i);
            expect(textElement).toHaveTextContent("2");
        });

        test("should have render red cross button", async () => {
            const textElement = screen.getByTestId("cartItem-cross-button");
            expect(textElement).toBeInTheDocument();
        });
    })
});
