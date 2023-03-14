import React from 'react';
import { renderComponent } from "../../utils/testing";
import '@testing-library/jest-dom'
import { Checkout } from "../../pages/Checkout/Checkout";
import "../../matchMedia.mock"
import Api from "../../services/api";
import {getProductsResponse} from "../../utils/fixtures/products";
import {waitFor} from "@testing-library/react";
import {cartItem, cartItems} from "../../utils/fixtures/cart";
import {CartItemType} from "../../typings/cart";


describe("CheckoutForm Test", () => {
    beforeEach(() => {
        const mockedGetProducts = jest.spyOn(Api.prototype, "getProducts");
        mockedGetProducts.mockImplementation(() => Promise.resolve(getProductsResponse.products));

        const mockedPostCheckoutCart = jest.spyOn(Api.prototype, 'postCheckoutCart');
        mockedPostCheckoutCart.mockImplementation((items: CartItemType[],email: string,promoCode: string | null) => {
            return Promise.resolve({
                items:[cartItem(3)],
                promoCode:"",
                email: "example@gmail.com"
            });
        })

        const mockedSetLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
        mockedSetLocalStorage.mockImplementation(() => {
            jest.fn();
        } )

        const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
        mockedLocalStorage.mockImplementation((keyName:string) => {
            return JSON.stringify({
                items: [cartItem(3)],
                voucher: "",
                name: "abc",
                billingEmail: "example@gmail.com",
            })
        } )

        /*const setStateMock = jest.fn();
        const useStateMock:any = (useStateTest:any) => [useStateTest, setStateMock];
        jest.spyOn(React,"useState").mockImplementation(useStateMock);

        */
        /*
        only works if we use React.usestate in the page

        const realUseState = React.useState;

        jest.spyOn(React,"useState")
            .mockImplementationOnce(() => [false, ()=>{}])
            .mockImplementationOnce(realUseState)*/
    })
    test("should render header Checkout", async () => {
        const screen = renderComponent(<Checkout />)
        //screen.debug();
        const headingElement = screen.getByText(/Checkout/i);
        expect(headingElement).toBeInTheDocument();
    })

    test("should render header Checkout", async () => {
        const screen = renderComponent(<Checkout />)
        //screen.debug();
        const headingElement = screen.getByText(/Checkout/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render header Order Summary", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        //screen.debug();
        const headingElement = screen.getByText(/Order Summary/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render name 'abc'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/abc/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render email 'example@gmail.com'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/example@gmail.com/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render the item 'SCSE Standard T-shirt'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/SCSE Standard T-shirt/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render the price '$36.00'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/\$36.00/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render Qty x3", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/Qty x3/i);
        expect(headingElement).toBeInTheDocument();
    })
    test("should render the size of the product: 'M'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByTestId("checkout-size");
        expect(headingElement).toHaveTextContent("M");
    })
    test("should render price of each product: '$12.00 each'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/\$12.00 each/i);;
        expect(headingElement).toBeInTheDocument();
    })
    test("should render there is 1 item(s)", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/1 item\(s\)/i);;
        expect(headingElement).toBeInTheDocument();
    })
    test("should render Edit button", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/Edit/i);;
        expect(headingElement).toBeInTheDocument();
    })
    test("should render the text 'Grand Total'", async () => {
        const screen = renderComponent(<Checkout />)

        await waitFor(() => {
            const headingElement = screen.getByText(/Order Summary/i);
            expect(headingElement).toBeInTheDocument();
        })
        const headingElement = screen.getByText(/Grand Total/i);;
        expect(headingElement).toBeInTheDocument();
    })
    describe("cart item: 2", ()=> {
        beforeEach(() => {
            const mockedPostCheckoutCart = jest.spyOn(Api.prototype, 'postCheckoutCart');
            mockedPostCheckoutCart.mockImplementation((items: CartItemType[],email: string,promoCode: string | null) => {
                return Promise.resolve({
                    items:cartItems(),
                    promoCode:"",
                    email: "example@gmail.com"
                });
            })

            const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
            mockedLocalStorage.mockImplementation((keyName:string) => {
                return JSON.stringify({
                    items: cartItems(),
                    voucher: "",
                    name: "abc",
                    billingEmail: "example@gmail.com",
                })
            } )
        })
        test("should render 2 items", async () => {
            const screen = renderComponent(<Checkout />)

            await waitFor(() => {
                const headingElement = screen.getByText(/Order Summary/i);
                expect(headingElement).toBeInTheDocument();
            })
            const headingElement = screen.getByText(/2 item\(s\)/i);;
            expect(headingElement).toBeInTheDocument();
        })
    })
})