import { Box, Button, DialogActions } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "28px",
    paddingRight: "4px",
  },
}));

const ModalAction = (props) => {
  const {
    children,
    textOk,
    textClose,
    onClose,
    onOk,
    isLoading,
    isNotShowCloseButton,
    isNotShowActionButton,
    disabledOk,
    renderActions: Component,
    ...remainProps
  } = props;
  const classes = useStyles();

  if (!onOk && !onClose && !Component) {
    return <> </>;
  }

  return (
    <DialogActions {...remainProps} classes={{ root: classes.root }}>
      {Component ? (
        <Component />
      ) : (
        <Box display="flex">
          {onClose && !isNotShowCloseButton ? (
            <Button variant="outlined" color="primary" size="small" onClick={() => onClose()}>
              {textClose ? textClose : "Cancel"}
            </Button>
          ) : null}
          {onOk && !isNotShowActionButton ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: "16px" }}
              onClick={() => onOk()}
              isLoading={isLoading}
              disabled={disabledOk}
            >
              {textOk ? textOk : "OK"}
            </Button>
          ) : null}
        </Box>
      )}
    </DialogActions>
  );
};

export default ModalAction;