import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddStaffNoteModal from "../components/modal/AddStaffNoteModal";
import StaffNoteTableBody from "../components/table/body/StaffNoteTableBody";
import { DELETE_STAFF_NOTE_MUTATION } from "../graphQl/staff/staffMutation";
import { LOAD_STAFF_NOTES } from "../graphQl/staff/staffQueries";
const StaffNote = (props) => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery(LOAD_STAFF_NOTES);
  const [staffNote, setStaffNote] = useState([]);
  const [delStaffNote] = useMutation(DELETE_STAFF_NOTE_MUTATION);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      if (data) setStaffNote(data.staffNotesByUser.map((item) => item));
    }
    fetchData();
  }, [data]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (selected) => {
    if (selected === []) return;
    try {
      selected.forEach((item) => {
        delStaffNote({
          variables: { staffNoteID: parseInt(item) },
          refetchQueries: [{ query: LOAD_STAFF_NOTES }],
        });
      });
      enqueueSnackbar("Delete Successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("Error occurred", AlertErrorProp);
    }
  };

  const headCells = [
    {
      id: "noteDate",
      numeric: false,
      disablePadding: false,
      label: "Date",
    },
    {
      id: "message",
      numeric: false,
      disablePadding: false,
      label: "Message",
    },
    {
      id: "seen",
      numeric: false,
      disablePadding: false,
      label: "Seen",
    },
    {
      id: "update",
      numeric: false,
      disablePadding: false,
      label: "Update",
    },
  ];

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
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "flex-end" }}
          onClick={(e) => {
            setOpen(true);
          }}
        >
          Add Staff Note
        </Button>
        <Box width="100%">
          <BudaTable
            data={staffNote}
            deleteItems={handleDelete}
            headCells={headCells}
            type="staffNoteID"
            DetailTableBody={StaffNoteTableBody}
            isNotShowCheckBox={true}
          />
        </Box>
      </Box>
      <AddStaffNoteModal open={open} close={handleClose} />
    </Box>
  );
};

export default StaffNote;
