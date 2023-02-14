import { render, screen } from "@testing-library/react";
import CartHeader from "../../pages/Cart/CartHeader";

describe("Card test", () => {
	test("1 + 2 should return 3", () => {
		render(<CartHeader />);
		expect(1 + 2).toEqual(3);
	});
});

export {};
