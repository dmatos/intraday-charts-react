import './DateInput.css';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAppDispatch} from "../AppContext";
import {Dayjs} from "dayjs";
function DateInput(){
    const dispatch = useAppDispatch();
    const isWeekend = (date: Dayjs) => {
        const day = date.day();

        return day === 0 || day === 6;
    };
    return (
        <div className="DateInput">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    shouldDisableDate={isWeekend}
                    onChange={(date: Dayjs|null) => {
                        if(!!date) {
                            let year = ""+date.year();
                            let month = (""+(date.month()+1)).padStart(2,"0");
                            let day =(""+date.date()).padStart(2,"0");
                            let formattedDate = [year,month,day].join("-");
                            dispatch({
                                type: "setSelectedDate",
                                payload: formattedDate
                            })
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}

export default DateInput;
