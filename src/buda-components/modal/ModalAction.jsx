import { Box, Button, DialogActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
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
    okButtonType, // primary | secondary | success | error
    renderActions: Component,
    ...remainProps
  } = props;
  const classes = useStyles();
  const {t} = useTranslation('common');
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
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => onClose()}
            >
              {textClose ? textClose : t("common:cancel")}
            </Button>
          ) : null}
          {onOk && !isNotShowActionButton ? (
            <Button
              variant="contained"
              color={okButtonType ? okButtonType : "primary"}
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
