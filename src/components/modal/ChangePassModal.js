import { useMutation } from "@apollo/client";
import { UPDATE_PASS } from "../../graphQl/changePassword/mutation";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { TextField, Box } from "@mui/material";
import { useState } from "react";
const ChangePassModal = ({ isOpen, handleClose }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const { updatePass } = useMutation(UPDATE_PASS);

  const isValid = () => {
    if (
      password !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      newPassword === confirmPassword
    ) {
      return true;
    }
    enqueueSnackbar("Not valid", AlertErrorProp);
    return false;
  };
  const handleSubmit = async () => {
    if (!isValid()) return;
    try {
      await updatePass({
        variables: {
          currentPassword: password,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        },
      }).then(() => {
        enqueueSnackbar("Update successfully", AlertSuccessProp);
        handleClose();
      });
    } catch (e) {
      enqueueSnackbar("Error", AlertErrorProp);
      handleClose();
    }
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        width: "480 px",
        "& > :not(style)": { m: 1 },
      }}
    >
      <BudaModal
        title="Change Password"
        open={isOpen}
        onClose={handleClose}
        textOk="Save"
        onOk={handleSubmit}
        children={
          <>
            <TextField
              required
              fullWidth
              label="Current password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box py={1}></Box>
            <TextField
              required
              fullWidth
              label="New password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Box py={1}></Box>
            <TextField
              required
              fullWidth
              type="password"
              label="Confirm new password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        }
      />
    </Box>
  );
};
export default ChangePassModal;
