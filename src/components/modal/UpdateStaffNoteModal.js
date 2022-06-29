import { React,useState } from "react";
import { useMutation,useQuery } from "@apollo/client";
import { UPDATE_STAFF_NOTE } from "../../graphQl/staff/staffMutation";
import { LOAD_STAFF_NOTES } from "../../graphQl/staff/staffQueries";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import BudaModal from "../../buda-components/modal/BudaModal";
const UpdateStaffNoteModal = ({data,open,close}) => {
    const [ mess,setMesss ] = useState(data.mess);
    const [ staffID,setStaffID ] = useState(data.staffID);
    const id = data.staffNoteID;
    const [ updateStaffNote ] = useMutation(UPDATE_STAFF_NOTE);

    const editStaffNote = () => {
        updateStaffNote({
            variables: {
                staffNoteID: parseInt(id),
                message: mess,
                staffID:parseInt(staffID),
            },
            refetchQueries: [
                { 
                    query:LOAD_STAFF_NOTES,
                }
            ],
        })
        .then((res) => {
            close();
            console.log("SUCCESS");
        })
        .catch((e) => console.log(e));
    }

    const isValid = () => {
        if(mess == "" || staffID == 0) return false;
        return true;
    }

    const handleSubmit = () => {
        if(isValid()) 
        editStaffNote();
        console.log("SubMit")
    }

    return (
        <BudaModal
            open = {open}
            onClose = {close}
            textOK = "Update"
            onOk={handleSubmit}
            title="Update Staff Note"
            children = {
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{
                        width: "480px",
                        "& > :not(style)": { m: 1 },
                    }}
                    >
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Mess"
                        variant="outlined"
                        value={mess}
                        onChange={(e) => setMesss(e.target.value)}
                    />
                    
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Staff ID"
                        variant="outlined"
                        value={staffID}
                        onChange={(e) => setStaffID(e.target.value)}
                    />
                    
                </Box>
            }
        />

    )

}

export default UpdateStaffNoteModal;