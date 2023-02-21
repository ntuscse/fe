
import MerchEmptyView from '../../pages/MerchDetail/EmptyView'
import { renderComponent } from '../../utils/testing'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe("MerchEmptyView", () => {
    test("should display correct texts", () => {
        const screen = renderComponent(<MerchEmptyView />)
        const heading = screen.getByText(/The item does not exist.../i)
        expect(heading).toBeInTheDocument()

        const pElement = screen.getByText(/Redirecting you in 3 seconds.../i)
        expect(pElement).toBeInTheDocument()
    })

    test("should redirect to home after 3 seconds", () => {
        const history = createMemoryHistory();
        const screen = render(
            <BrowserRouter>
                <MerchEmptyView />
            </BrowserRouter>
        )

        jest.useFakeTimers();
        setTimeout(() => {
            screen.debug()
            const pElement = screen.getByText(/Redirecting you in 3 seconds.../i)
            expect(pElement).not.toBeInTheDocument()
        }, 5000);
        jest.runAllTimers();
    })
})