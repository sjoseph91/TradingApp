import { StockList } from "../components/StockList";
import { AutoComplete } from "../components/AutoComplete";

export const StockOverviewPage = () => {
    return (
        <div className="overview-page">
            <h1 className="my-4 text-center">Stock Tracker</h1>
            <AutoComplete />
            <StockList />
        </div>
    )
}