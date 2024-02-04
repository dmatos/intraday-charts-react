import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

export interface DateInputData{
    onChangeFn: (year:string, month:string, day:string)=>void
}

function DateInput({onChangeFn}:DateInputData){
    const isWeekend = (date: Dayjs) => {
        const day = date.day();
        return day === 0 || day === 6;
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                shouldDisableDate={isWeekend}
                onChange={(date: Dayjs|null) => {
                    if(!!date) {
                        onChangeFn(""+date.year(), ""+(date.month()+1),""+date.date())
                    }
                }}
            />
        </LocalizationProvider>
    )
}

export default DateInput;
