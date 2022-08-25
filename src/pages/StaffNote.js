import { useMutation, useQuery } from "@apollo/client";
import { Toolbar,Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import StaffNoteTableBody from "../components/table/body/StaffNoteTableBody";
import BudaTable from "../buda-components/table/BudaTable";
import Box from "@mui/material/Box";
import { LOAD_STAFF_NOTES } from "../graphQl/staff/staffQueries";
import { DELETE_STAFF_NOTE_MUTATION } from "../graphQl/staff/staffMutation";
import { useSnackbar } from "notistack";
import BudaModal from "../buda-components/modal/BudaModal";
import { AlertErrorProp,AlertSuccessProp } from "../buda-components/alert/BudaNoti";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddStaffNoteModal from "../components/modal/AddStaffNoteModal";
const StaffNote = (props) => {
    const { window } = props;
    const [ open,setOpen ] = useState(false);
    const [ addOpen,setAddOpen ] = useState(false);
    const { err,loading,data } = useQuery(LOAD_STAFF_NOTES);
    const [ staffNote,setStaffNote ] = useState([]);
    const [ delStaffNote ] = useMutation(DELETE_STAFF_NOTE_MUTATION); 
    const { enqueueSnackbar } = useSnackbar();
    const [ isLoading,setIsLoading ] = useState(false);
    const history  = useHistory();
    useEffect(() => {
        async function fetchData() {
            if(data) setStaffNote(data.staffNotesByUser.map((item)=>item));
        }
        fetchData();
    }, [data]);
    const handleClose = () => {
        setOpen(false);
    }
    const handleDelete = (selected) => {
        if (selected === []) return ;
        setIsLoading(true);
        try {
            selected.forEach((item) => {
                delStaffNote({
                    variables: { staffNoteID: parseInt(item) },
                    refetchQueries: [{ query: LOAD_STAFF_NOTES }]
                })
            })
            enqueueSnackbar("Delete Successfully",AlertSuccessProp);
        }
        catch(e){
            enqueueSnackbar("Error occured",AlertErrorProp);
        }
        finally{
            setIsLoading(false);
        }
    }
    const headCells = [
        {
            id: "noteDate",
            numeric: false,
            disablePadding: false,
            label: "Date"
        },
        {
            id: "message",
            numeric: false,
            disablePadding: false,
            label: "Message"
        },
        {
            id: "seen",
            numeric: false,
            disablePadding: false,
            label: "Seen"
        },
        {
            id: "update",
            numeric: false,
            disablePadding: false,
            label: "Update"
        },

    ]
    

    return ( 
        <Box sx={{ display: "flex" }}>
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                m={3}
            >
                <Toolbar />
                <Button variant="contained" color="primary" style={{ alignSelf: "flex-end" }} onClick={(e)=>{setOpen(true)}}>
                    Add Staff Note
                </Button>
                <Box  width="100%">
                  <BudaTable 
                    data={staffNote}
                    deleteItems = { handleDelete} 
                    headCells={headCells}
                    type="staffNoteID"
                    DetailTableBody={StaffNoteTableBody}
                    isNotShowCheckBox={true}
                    />  
                </Box>
            </Box>
            <AddStaffNoteModal 
                open = {open}
                close={handleClose}
            />
        </Box>
    )
}

export default StaffNote;