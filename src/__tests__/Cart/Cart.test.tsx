import "../../matchMedia.mock"
import { act, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import * as mediaQueryHooks from "@chakra-ui/media-query";
import { renderComponent } from "../../utils/testing";
import Cart from "../../pages/Cart";
import '@testing-library/jest-dom'
import Api from "../../services/api";
import { getProductResponse, getProductsResponse } from "../../utils/fixtures/products";
import { cartItem } from "../../utils/fixtures/cart";


jest.mock("../../services/api");

global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
        json: () => Promise.resolve(1),
    })
)

describe("MerchDetail", () => {
    beforeEach(() => {
        const mockedGetProduct = jest.spyOn(Api.prototype, "getProduct");
        mockedGetProduct.mockImplementation(() => Promise.resolve(getProductResponse));

        const mockedGetProducts = jest.spyOn(Api.prototype, "getProducts");
        mockedGetProducts.mockImplementation(() => Promise.resolve(getProductsResponse.products));

        const mockedSetLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
        mockedSetLocalStorage.mockImplementation(() => {
            jest.fn();
        } )
    })
    describe("Current cart: 3/4", () => {
        beforeEach(() => {
            const mockedPostQuotation = jest.spyOn(Api.prototype, "postQuotation");
            mockedPostQuotation.mockImplementation(() =>
                Promise.resolve({
                    items:[cartItem(3)],
                    promoCode:""
                })
            );

            const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
            mockedLocalStorage.mockImplementation((keyName:string) => {
                return JSON.stringify({
                    items: [cartItem(3)],
                    voucher: "",
                    name: "",
                    billingEmail: "",
                })
            } )
        })

        test("should render cart heading", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            // screen.debug();
            expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();

        })

        test("should be able to add quantity of items", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const plusElement = screen.getByText("+");
            fireEvent.click(plusElement);
            // screen.debug();
            expect(screen.getByPlaceholderText(/Item Count/i)).toHaveValue('4');
        })

        test("should render correct price after adding quantity of items", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const plusElement = screen.getByText("+");
            fireEvent.click(plusElement);
            // screen.debug();
            expect(screen.getByText(/\$48.00/i)).toBeInTheDocument();
        })

        test("should be able to delete quantity of items", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const plusElement = screen.getByText("-");
            fireEvent.click(plusElement);
            // screen.debug();
            expect(screen.getByPlaceholderText(/Item Count/i)).toHaveValue('2');
        })

        test("should render correct price after deleting quantity of items", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const plusElement = screen.getByText("-");
            fireEvent.click(plusElement);
            // screen.debug();
            expect(screen.getByText(/\$24.00/i)).toBeInTheDocument();
        })

        test("should render the qty input", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const inputElement = screen.getByPlaceholderText(/Item Count/i);
            expect(inputElement).toBeInTheDocument();
        })

        test("should be able to change quantity through input (should render 2 as change to 2)", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const inputElement = screen.getByPlaceholderText(/Item Count/i);
            fireEvent.change(inputElement, { target: { value: "2" } })
            expect(inputElement).toHaveValue('2');
        })

        test("should not be able to input more than max stock", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const inputElement = screen.getByPlaceholderText(/Item Count/i);
            fireEvent.change(inputElement, { target: { value: "20" } })
            //screen.debug(undefined,Infinity);
            expect(inputElement).toHaveValue('4');
        })

        test("should return to min count (1) if the input is not a number", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const inputElement = screen.getByPlaceholderText(/Item Count/i);
            fireEvent.change(inputElement, { target: { value: "abc" } })
            //screen.debug(undefined,Infinity);
            expect(inputElement).toHaveValue('1');
        })

        test("should render removeModal if the input is less than or equal to 0", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            const inputElement = screen.getByPlaceholderText(/Item Count/i);
            fireEvent.change(inputElement, { target: { value: "-1" } })
            //screen.debug(undefined,Infinity);
            const headingElement = screen.getByText(/Do you want to remove this product?/i);
            expect(headingElement).toBeInTheDocument();
        })

        test("should render delete button", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });

            const buttonElement = screen.getByText("Delete");
            expect(buttonElement).toBeInTheDocument();
            //screen.debug();
        })

        test("should render removeModal after clicking delete button", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });

            const buttonElement = screen.getByText("Delete");
            fireEvent.click(buttonElement);
            const headingElement = screen.getByText(/Do you want to remove this product?/i);
            expect(headingElement).toBeInTheDocument();
        })

        describe("order summary", () => {
            test("should render cart card's header: order summary", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                const titleElement = screen.getByText(/Order Summary/i);
                expect(titleElement).toBeInTheDocument();
            })
            test("should render cart text: item subtotal, voucher discount, total", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                expect(screen.getByText(/Item\(s\) subtotal/i)).toBeInTheDocument();
                expect(screen.getByText(/Voucher Discount/i)).toBeInTheDocument();
                expect(screen.getByText(/^Total$/i)).toBeInTheDocument();
            })
            test("should render re-calculating text after adding qty to a cart item", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                const titleElement = screen.getByText(/Order Summary/i);
                expect(titleElement).toBeInTheDocument();
                //screen.debug()
            })
            test("should render buttonElement, and disable at the start", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                const buttonElement = screen.getByText(/Check Out/i);
                expect(buttonElement).toBeInTheDocument();
                expect(buttonElement).toBeDisabled();
            })
            test("should disable checkout button while name and address are empty", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                const nameElement = screen.getByPlaceholderText(/Name/i);
                const emailElement = screen.getByPlaceholderText(/Billing email address/i);
                fireEvent.change(nameElement, { target: { value: "" } });
                fireEvent.change(emailElement, { target: { value: "" } });
                const buttonElement = screen.getByText(/Check Out/i);
                expect(buttonElement).toBeDisabled();
            })
            test("should render invalid email address if the format is invalid", async () => {
                // api.getProducts.mockResolvedValue(getProductsResponse.products)
                // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

                const screen = renderComponent(<Cart />)
                await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                    { timeout: 75 });

                const nameElement = screen.getByPlaceholderText(/Name/i);
                const emailElement = screen.getByPlaceholderText(/Billing email address/i);
                fireEvent.change(nameElement, { target: { value: "abc" } });
                fireEvent.change(emailElement, { target: { value: "def" } });
                const buttonElement = screen.getByText(/Check Out/i);
                fireEvent.click(buttonElement);
                await waitForElementToBeRemoved(() => screen.getByText(/Loading/i),
                    { timeout: 75 });

                const textElement = screen.getByText(/\*Invalid email format/i);
                expect(textElement).toBeInTheDocument();
            })
            //to test routing -> not sure if needed?
        })

    })

    describe("Current cart: 4/4",() => {
        beforeEach(() => {
            const mockedPostQuotation = jest.spyOn(Api.prototype, "postQuotation");
            mockedPostQuotation.mockImplementation(() =>
                Promise.resolve({
                    items:[cartItem(4)],
                    promoCode:""
                })
            );

            const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
            mockedLocalStorage.mockImplementation((keyName:string) => {
                return JSON.stringify({
                    items: [cartItem(4)],
                    voucher: "",
                    name: "",
                    billingEmail: "",
                })
            } )
        })

        test("should not be able to add after max stock", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });

            const plusElement = screen.getByText("+");
            fireEvent.click(plusElement);

            expect(screen.getByPlaceholderText(/Item Count/i)).toHaveValue('4');
        })
    })

    describe("Current cart: 1/4",() => {
        beforeEach(() => {
            const mockedPostQuotation = jest.spyOn(Api.prototype, "postQuotation");
            mockedPostQuotation.mockImplementation(() =>
                Promise.resolve({
                    items:[cartItem(1)],
                    promoCode:""
                })
            );

            const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
            mockedLocalStorage.mockImplementation((keyName:string) => {
                return JSON.stringify({
                    items: [cartItem(1)],
                    voucher: "",
                    name: "",
                    billingEmail: "",
                })
            } )
        })

        test("should render removeModal after reduce", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });

            const plusElement = screen.getByText("-");
            fireEvent.click(plusElement);

            // screen.debug(undefined,Infinity);
            const headingElement = screen.getByText(/Do you want to remove this product?/i);
            expect(headingElement).toBeInTheDocument();
        })

        test("should remove product after removing product", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });

            const plusElement = screen.getByText("-");
            fireEvent.click(plusElement);

            await waitFor(() => {
                const headingElement = screen.getByText(/Do you want to remove this product?/i);
                expect(headingElement).toBeInTheDocument();
            })

            const buttonElement = screen.getByText(/Yes/i);
            fireEvent.click(buttonElement);

            const productNameElement = screen.queryByText(/SCSE Standard T-shirt/i);
            expect(productNameElement).not.toBeInTheDocument();
            // screen.debug(undefined,Infinity);
        })
    })
    describe("mobile view", () => {
        beforeEach(() => {
            const mockedPostQuotation = jest.spyOn(Api.prototype, "postQuotation");
            mockedPostQuotation.mockImplementation(() =>
                Promise.resolve({
                    items:[cartItem(1)],
                    promoCode:""
                })
            );

            const mockedLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
            mockedLocalStorage.mockImplementation((keyName:string) => {
                return JSON.stringify({
                    items: [cartItem(1)],
                    voucher: "",
                    name: "",
                    billingEmail: "",
                })
            } )

            jest.spyOn(mediaQueryHooks, 'useBreakpointValue').mockReturnValue(true);
        })
        test("should render cart heading", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)
            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            //screen.debug();
            expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
        })
        test("should render cross button", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            //screen.debug();
            const buttonElement = screen.getByTestId("cartItem-cross-button");
            expect(buttonElement).toBeInTheDocument();
        })
        test("should render removeModal after clicking cross button", async () => {
            // api.getProducts.mockResolvedValue(getProductsResponse.products)
            // (api.getProducts as jest.Mock).mockResolvedValue(getProductsResponse.products)

            const screen = renderComponent(<Cart />)
            await waitForElementToBeRemoved(() => screen.getByText('Fetching Cart Details'),
                { timeout: 75 });
            //screen.debug();
            const buttonElement = screen.getByTestId("cartItem-cross-button");
            fireEvent.click(buttonElement);
            const headingElement = screen.getByText(/Do you want to remove this product?/i);
            expect(headingElement).toBeInTheDocument();
        })
    })
})
