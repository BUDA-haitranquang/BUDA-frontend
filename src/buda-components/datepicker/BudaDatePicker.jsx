import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import viLocale from "date-fns/locale/vi";
import { isNull } from "lodash";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  timeInput: {
    width: "100%"
  },
  dateTimeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  timePickerStyle: {
    "&.MuiOutlinedInput-root": { paddingRight: "0" }
  }
});

const BudaDatePicker = ({
                          onlyDate,
                          label,
                          initialDate = new Date(0, 0, 0, 0, 0, 0),
                          setValue = () => {
                          }
                        }) => {
  const classes = useStyles();
  const [timeValue, setTimeValue] = useState(initialDate);

  useEffect(() => {
    setValue(timeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeValue]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box className={classes.dateTimeContainer}>
        <Box width={onlyDate ? "100%" : "80px"}>
          <CustomizeDatePicker
            setTimeValue={(val) => setTimeValue(val)}
            timeValue={timeValue}
            label={label}
          />
        </Box>
        {!onlyDate && (
          <>
            <Box px={1}></Box>

            <Box width="120px">
              <CustomizeTimePicker
                setTimeValue={(val) => setTimeValue(val)}
                timeValue={timeValue}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BudaDatePicker;

const initializeDate = (timeValue) => {
  const INITIALDATE = new Date(0, 0, 0, 0, 0, 0);
  if (!(timeValue instanceof Date) || isNaN(timeValue)) return null;
  return timeValue.getFullYear() !== INITIALDATE.getFullYear() ||
  timeValue.getMonth() !== INITIALDATE.getMonth() ||
  timeValue.getDate() !== INITIALDATE.getDate()
    ? timeValue
    : null;
};

const CustomizeDatePicker = ({ setTimeValue, timeValue, label }) => {
  const classes = useStyles();
  const [date, setDate] = useState(initializeDate(timeValue));

  useEffect(() => {
    let day = new Date(0, 0, 0, 0, 0, 0);
    if (!(date instanceof Date) || isNaN(date)) return;
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    day.setHours(timeValue.getHours());
    day.setMinutes(timeValue.getMinutes());
    day.setSeconds(0);
    setTimeValue(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
        <DesktopDatePicker
          label={label}
          value={date}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                ...params.InputProps,
                shrink: true,
                placeholder: "dd/mm/yyyy"
              }}
              className={classes.timeInput}
            />
          )}
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};

// const CustomizeTimePicker = ({setTimeValue,timeValue}) =>{
//   const classes = useStyles();
//   const [time,setTime] = useState(null);

//   useEffect(()=>{
//     let day = new Date();
//     if(!(time instanceof Date) || isNaN(time)) return;

//     day.setFullYear(timeValue.getFullYear(),timeValue.getMonth(),timeValue.getDate());
//     day.setHours(time.getHours());
//     day.setMinutes(time.getMinutes());

//     setTimeValue(day);
//   },[time]);
//   return(
//   <StyledEngineProvider injectFirst>
//  <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
//   <DesktopTimePicker
//         label='Time'
//         value={time}

//         onChange={(newValue) => {
//           setTime(newValue);
//         }}
//         renderInput={(params) => <TextField className={classes.timeInput}
//         {...params} />}
//       />
//   </LocalizationProvider>
//   </StyledEngineProvider>
//   )
// }

const CustomizeTimePicker = ({ setTimeValue, timeValue }) => {
  const classes = useStyles();
  const [time, setTime] = useState("");
  useEffect(() => {
    let day = new Date();

    if (!(typeof time === "string") || isNull(time)) return;

    day.setFullYear(
      timeValue.getFullYear(),
      timeValue.getMonth(),
      timeValue.getDate()
    );

    day.setHours(time.slice(0, 2));
    day.setMinutes(time.slice(3, 5));
    day.setSeconds(0);
    setTimeValue(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <TextField
      className={classes.timePickerStyle}
      label="Time"
      type="time"
      InputLabelProps={{
        shrink: true
      }}
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
};
