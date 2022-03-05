import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { StyledEngineProvider } from '@mui/material/styles';

const Error = () => {
    return (
        <div>
            <StyledEngineProvider injectFirst>
                <BasicDatePicker/>
            </StyledEngineProvider>
            
        </div>
    )
}
export default Error;

const BasicDatePicker= () => {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
