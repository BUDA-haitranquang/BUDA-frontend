import React,{useState,useEffect} from 'react';
import {Box,TextField} from '@mui/material';
import { Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import viLocale from 'date-fns/locale/vi';
import { DesktopTimePicker } from '@mui/lab';
const useStyles = makeStyles({
  timeInput:{
      width:'100%',
  },
  dateTimeContainer:{
    width: '100%',
    display:'flex',
    flexDirection:'row'
  }
})

//export let value = new Date(0,0,0,0,0,0);
 
const BUDADatePicker = ({onlyDate,label,getDateTime})=>{
  const classes = useStyles();
  const [timeValue,setTimeValue] = useState(new Date(0,0,0,0,0,0));
  // useEffect(()=>{
  //   if(!(timeValue instanceof Date) || isNaN(timeValue) || timeValue.getTime() === new Date(0,0,0,0,0,0).getTime()) {
  //     return;
  //   }

  // },[timeValue])

  return(
  <>
  <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
  <Typography variant='h6'>{label}</Typography>  
  {onlyDate?
  <Box className={classes.dateTimeContainer}>
    <CustomizeDatePicker 
      setTimeValue={(val)=>setTimeValue(val)}
      timeValue={timeValue}/>
  </Box>
  :
  <Box className={classes.dateTimeContainer}>
    <Box width='180px'>
    <CustomizeDatePicker 
      setTimeValue={(val)=>setTimeValue(val)}
      timeValue={timeValue}/>
    </Box>

    <Box px={1}></Box>

    <Box width='120px'>
    <CustomizeTimePicker 
      setTimeValue={(val)=>setTimeValue(val)}
      timeValue={timeValue}/>
    </Box> 
  </Box>
  }
  </Box>
  </>
  )
}

export default BUDADatePicker;

const CustomizeDatePicker = ({setTimeValue,timeValue})=>{
  const classes = useStyles();
  const [date,setDate] = useState(null);

  useEffect(()=>{
    let day = new Date();
    if(!(date instanceof Date) || isNaN(date)) return;
    
    day.setFullYear(date.getFullYear(),date.getMonth(),date.getDate());
    day.setHours(timeValue.getHours());
    day.setMinutes(timeValue.getMinutes());

    setTimeValue(day);
  },[date]);
  return(
  <StyledEngineProvider injectFirst>
 <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
  <DesktopDatePicker
        label='Date'
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField className={classes.timeInput} {...params} />}
        //inputFormat='dd/mm/yyyy'
      />
  </LocalizationProvider>
  </StyledEngineProvider>
  )
}

const CustomizeTimePicker = ({setTimeValue,timeValue}) =>{
  const classes = useStyles();
  const [time,setTime] = useState(null);

  useEffect(()=>{
    let day = new Date();
    if(!(time instanceof Date) || isNaN(time)) return;
    
    day.setFullYear(timeValue.getFullYear(),timeValue.getMonth(),timeValue.getDate());
    day.setHours(time.getHours());
    day.setMinutes(time.getMinutes());
    
    setTimeValue(day);
  },[time]);
  return(
  <StyledEngineProvider injectFirst>
 <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
  <DesktopTimePicker
        label='Time'
        value={time}
        onChange={(newValue) => {
          setTime(newValue);
        }}
        renderInput={(params) => <TextField className={classes.timeInput} {...params} />}
      />  
  </LocalizationProvider>
  </StyledEngineProvider>
  )
} 