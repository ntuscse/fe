import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom"
import { Error404 } from "../../pages/Error404/Error404";

const MockError = () => {
    return <BrowserRouter>
        <Error404 />
    </BrowserRouter>
}

describe("Error404", () => {
    test("should have heading 'Error404'", async () => {
        render(<MockError />);
        const headingElement = screen.getByText(/Error 404/i);
        expect(headingElement).toBeInTheDocument();
    });

    test("should have text 'Page Not Found'", async () => {
        render(<MockError />);
        const textElement = screen.getByText(/Page Not Found/i);
        expect(textElement).toBeInTheDocument();
    });

    test("should have button 'Return to Homepage'", async () => {
        render(<MockError />);
        const buttonElement = screen.getByRole("button",{ name:/Return to Homepage/i });
        expect(buttonElement).toBeInTheDocument();
    });
});
