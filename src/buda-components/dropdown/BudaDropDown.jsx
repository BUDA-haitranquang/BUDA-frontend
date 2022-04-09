import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
const BudaDropDown = ({label,listName}) =>{
    const handleChange = (e) =>{ setGroup(e.target.value)};
    const [ value,setValue ] = React.useState("");
    <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select onChange={handleChange} value={value}>
            {listName.map((item)=>(
                <MenuItem>{item.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
    
}

export default BudaDropDown;