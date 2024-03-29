import { useMutation, useQuery } from "@apollo/client/react";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_STAFF_NOTE } from "../../graphQl/staff/staffMutation";
import {
  LOAD_STAFFS,
  LOAD_STAFF_NOTES,
} from "../../graphQl/staff/staffQueries";
const AddStaffNoteModal = ({ open, close }) => {
  const [mess, setMess] = useState("");
  const [id, setID] = useState();
  const [staff, setStaff] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    addStaffNote();
  };
  const { data } = useQuery(LOAD_STAFFS);
  useEffect(() => {
    async function fetchData() {
      if (data)
        setStaff(
          data.staffsByUser.slice().sort((a, b) => b.staffID - a.staffID)
        );
    }

    fetchData();
  }, [data]);
  const [newNote] = useMutation(ADD_STAFF_NOTE);
  const addStaffNote = () => {
    newNote({
      variables: {
        message: mess,
        staffID: parseInt(id),
      },
      refetchQueries: [{ query: LOAD_STAFF_NOTES }],
    })
      .then((res) => {
        close();
        enqueueSnackbar("Success", AlertSuccessProp);
      })
      .catch((e) => enqueueSnackbar("Error", AlertErrorProp));
  };

  return (
    <BudaModal
      open={open}
      onClose={close}
      textOk="Save"
      title="New Staff Note"
      onOk={handleSubmit}
      children={
        <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "400px",
          }}
        >
          <TextField
            type="text"
            id="outlined-basic"
            label="Message"
            variant="outlined"
            value={mess}
            style={{ width: "100%" }}
            onChange={(e) => setMess(e.target.value)}
          />
          <Box m={1}>{}</Box>
          <FormControl style={{ width: "70%", height: "50%" }}>
            <InputLabel>Staff's Name</InputLabel>
            <Select
              value={id}
              label="StaffName"
              onChange={(e) => setID(e.target.value)}
            >
              {staff.map((index) => (
                <MenuItem value={index.staffID}> {index.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      }
    />
  );
};

export default AddStaffNoteModal;
