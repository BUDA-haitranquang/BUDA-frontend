import { Fragment } from "react";
import { TableCell } from "@mui/material";
import { useMutation } from "@apollo/client";
import { Button, Box, TextField } from "@mui/material";
import { GET_STORE } from "../../../graphQl/myaccount/queries";
import { UPDATE_STORE } from "../../../graphQl/myaccount/mutaion";
import { useState } from "react";
import BudaModal from "../../../buda-components/modal/BudaModal";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
const StoreTableBody = (props) => {
  const { row, labelId } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableCell component="th" id={labelId} scope="row" align="left">
        {row.storeID}
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
      <TableCell align="left">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit
        </Button>
      </TableCell>
      <EditStoreModal
        isOpen={open}
        handleClose={() => {
          setOpen(false);
        }}
        row={row}
      />
    </Fragment>
  );
};

export default StoreTableBody;

const EditStoreModal = ({ isOpen, handleClose, row }) => {
  const [updateStore] = useMutation(UPDATE_STORE);
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(row.name);
  const [address, setAddress] = useState(row.address);
  const isValid = ({ name, address }) => {
    if (name === "" || address === "") {
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isValid(name, address)) {
      enqueueSnackbar("Not valid", AlertErrorProp);
      return;
    }

    try {
      await updateStore({
        variables: {
          userID: row.userID,
          storeID: row.storeID,
          name: name,
          address: address,
        },
        refetchQueries: [{ query: GET_STORE }],
      }).then(() => {
        enqueueSnackbar("Update successfully", AlertSuccessProp);
        handleClose();
      });
    } catch (e) {
      enqueueSnackbar("Error", AlertErrorProp);
      console.log(e);
    }
  };

  return (
    <BudaModal
      title={row.name}
      open={isOpen}
      onClose={handleClose}
      textOk="Save"
      onOk={handleSubmit}
      children={
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
            label="Store's name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            fullWidth
            multiline
            rows={3}
            id="outlined-basic"
            label="Store's address"
            variant="outlined"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Box>
      }
    />
  );
};
