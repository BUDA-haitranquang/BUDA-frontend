import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, Paper, Popper } from "@material-ui/core";
import { useState } from "react";
import { width } from "@mui/system";
import { usePopper } from "react-popper"

BudaPopper.propTypes = {
  open: PropTypes.bool,
  referenceElement: PropTypes.any,
  width: PropTypes.number,
  children: PropTypes.any,
  onClose: PropTypes.func,
  placement: PropTypes.string,
  arrow: PropTypes.bool,
};

function BudaPopper(props) {
  const {
    open,
    referenceElement,
    width,
    onClose,
    placement = "bottom-start",
    arrow = false,
    children,
  } = props;

  const [arrowRef, setArrowRef] = useState(null);
	const [popperElement, setPopperElement] = useState(null);

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
    {
      name: "preventOverflow",
      enabled: true,
      options: {
        altAxis: true,
        altBoundary: true,
        tether: true,
        rootBoundary: "document",
        padding: 8,
      },
    },
    {
      name: "arrow",
      enabled: arrow,
      options: {
        element: arrowRef,
      },
    },
  ];

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: placement,
		modifiers: [ ...modifiersDefault ]
	})

  let widthPopper = width || referenceElement?.offsetWidth || 0;

  const renderPopper = () => (
    <ClickAwayListener
      onClickAway={(e) => {
        if (!referenceElement.contains(e.target)) {
          onClose();
        }
      }}
      mouseEvent="onMouseDown"
    >
			<Paper
				elevation={3}
				ref={setPopperElement}
				style={{ width: widthPopper, ...styles.popper }}
				{...attributes.popper}
			>
				<Fragment>
					{arrow ? <span ref={setArrowRef} /> : null}
					{children}
				</Fragment>
			</Paper>
    </ClickAwayListener>
  );

  if (open) {
    return renderPopper();
  }
  return <Fragment> </Fragment>;
}

export default BudaPopper;
