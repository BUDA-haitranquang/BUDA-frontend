import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, Paper, Popper } from "@material-ui/core";
import { useState } from "react";

BudaPopper.propTypes = {
  open: PropTypes.bool,
  referenceElement: PropTypes.any,
	children: PropTypes.any,
  onClose: PropTypes.func,
  placement: PropTypes.string,
  arrow: PropTypes.bool,
};

function BudaPopper(props) {
  const {
    open,
    referenceElement,
    onClose,
    placement = "bottom-start",
    arrow = false,
    children,
  } = props;

  const [arrowRef, setArrowRef] = useState(null);

  let modifiersDefault = [
    {
      name: "flip",
      enabled: true,
      options: {
        altBoundary: true,
        rootBoundary: "document",
        padding: 8,
      },
    },
    // {
    //   name: "preventOverflow",
    //   enabled: true,
    //   options: {
    //     altAxis: true,
    //     altBoundary: true,
    //     tether: true,
    //     rootBoundary: "document",
    //     padding: 8,
    //   },
    // },
    {
      name: "arrow",
      enabled: { arrow },
      options: {
        element: arrowRef,
      },
    },
  ];

  const renderPopper = () => (
    <ClickAwayListener onClickAway={onClose} mouseEvent="onMouseDown">
      <Popper
        open={open}
        anchorEl={referenceElement}
        disablePortal
        placement={placement}
        modifiers={modifiersDefault}
      >
        {arrow ? <span ref={setArrowRef} /> : null}
        {children}
      </Popper>
    </ClickAwayListener>
  );

  if (open) {
    return renderPopper();
  }
  return <Fragment> </Fragment>;
}

export default BudaPopper;
