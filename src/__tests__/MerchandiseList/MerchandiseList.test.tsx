import "../../matchMedia.mock"
import { QueryClient } from "@tanstack/react-query"
import {renderComponent} from "../../utils/testing";
import MerchandiseList from "../../pages/MerchandiseList";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });


describe("Merchandise List", () => {
    test("should render", () => {
        renderComponent(<MerchandiseList />)
    })
})
