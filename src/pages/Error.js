import * as React from 'react';
import { Box } from '@mui/material';
import BUDADatePicker from '../components/BUDADatePicker/BUDADatePicker';
const Error = () => {

    return (
        <div>
          <Box px ={{width:'150px'}}>
          <BUDADatePicker onlyDate={true} label = 'test' />
          </Box>
          
          <Box px ={1}>
          <BUDADatePicker onlyDate={false} label = 'test'/>
          </Box>
        </div>
    )
}
export default Error;

