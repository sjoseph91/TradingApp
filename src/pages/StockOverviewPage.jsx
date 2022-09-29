import { StockList } from "../components/StockList";
import { AutoComplete } from "../components/AutoComplete";

export const StockOverviewPage = () => {
    return (
        <div>
            Stock Overview Page
            <AutoComplete />
            <StockList />
        </div>
    )
}