import React,{useState} from 'react';
import {Box,TextField} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
const BUDADatePicker = ({onlyDate,label})=>{
const [date,setDate] = useState(new Date());
return(
<Box sx={{width:'100%'}}>
<DesktopDatePicker
          label={label}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
</Box>
)
}

export default BUDADatePicker;