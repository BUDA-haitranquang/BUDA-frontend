import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import viLocale from "date-fns/locale/vi";
// import { DesktopTimePicker } from '@mui/lab';
// import InputAdornment from '@mui/material/InputAdornment';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { isNull } from "lodash";

const useStyles = makeStyles({
  timeInput: {
    width: "100%",
  },
  dateTimeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  timePickerStyle: {
    "&.MuiOutlinedInput-root": { paddingRight: "0" },
  },
});

const BudaDatePicker = ({
  onlyDate,
  label,
  initialDate = new Date(0, 0, 0, 0, 0, 0),
}) => {
  const classes = useStyles();
  const [timeValue, setTimeValue] = useState(initialDate);

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{label}</Typography>

        <Box className={classes.dateTimeContainer}>
          <Box width="180px">
            <CustomizeDatePicker
              setTimeValue={(val) => setTimeValue(val)}
              timeValue={timeValue}
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
    </>
  );
};

export default BudaDatePicker;

const CustomizeDatePicker = ({ setTimeValue, timeValue }) => {
  const classes = useStyles();
  const [date, setDate] = useState(null);

  useEffect(() => {
    let day = new Date();
    if (!(date instanceof Date) || isNaN(date)) return;

    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    day.setHours(timeValue.getHours());
    day.setMinutes(timeValue.getMinutes());
    day.setSeconds(0);
    setTimeValue(day);
  }, [date]);
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
        <DesktopDatePicker
          label="Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.timeInput}
              {...params}
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
  }, [time]);

  return (
    <TextField
      className={classes.timePickerStyle}
      label="Time"
      type="time"
      InputLabelProps={{
        shrink: true,
      }}
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
};
