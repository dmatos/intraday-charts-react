import './AppHeader.css'
import StockExchangeInput from "./StockExchangeInput";
import TickerInput from "./TickerInput";
import DateInput from "./DateInput";
import ExecuteButton from "./ExecuteButton";

function AppHeader() {
    return (
        <div className="AppHeader">
            <StockExchangeInput/>
            <TickerInput/>
            <DateInput/>
            <ExecuteButton/>
        </div>
    )
}
export default AppHeader;
