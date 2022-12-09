import { TableCell,Button } from "@mui/material";
import { React,useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import UpdateStaffNoteModal from "../../modal/UpdateStaffNoteModal";
const StaffNoteTableBody = (props) =>{
    const { row } = props;
    const [ isOpen,setIsOpen ] = useState(false);
    const handleOpen = () => { 
        setIsOpen(true) 
    }
    const close = () => {
        setIsOpen(false);
    }
    const convert = (str) => {
        str = str.replace('T',' ');
        str = str.replace('Z',' ');
        return str;
    }

    return (
        <>
            <TableCell align="left">{convert(row.noteDate)}</TableCell>
            <TableCell align="left">{row.message}</TableCell>
            <TableCell align="left">{row.seen === false ? "Uncheck" : <CheckIcon/>}</TableCell>
            <TableCell align="left">
                <Button variant="outlined" onClick={handleOpen}>
                    Update
                </Button>
            </TableCell>
            <UpdateStaffNoteModal
                data = { row }
                open =  { isOpen } 
                close = { close }
            />
        </>
    )
}

export default StaffNoteTableBody;
