import * as React from 'react';
import BudaDatePicker from '../buda-components/datepicker/BudaDatePicker';
const Error = () => {

    return (
        <div>
          <BudaDatePicker onlyDate={false} label = 'test' initialDate={new Date(2001,3,2)}/>
        </div>
    )
}
export default Error;

