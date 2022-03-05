import React from "react";
import PropTypes from "prop-types";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { useRef } from "react";
import BudaPopper from "../Popper/BudaPopper";
import { Box } from "@material-ui/core";

LiveSearch.propTypes = {
  handleRender: PropTypes.func,
  placeholder: PropTypes.string,
  createable: PropTypes.bool,
  textCreate: PropTypes.string,
  onClickCreate: PropTypes.func,
  inputProps: PropTypes.object,
};

function LiveSearch(props) {
  const {
    handleRender,
    placeholder,
    createable,
    textCreate,
    onClickCreate,
    inputProps,
  } = props;

  const [query, setQuery] = useState("");
  const [popperOpen, setPopperOpen] = useState(false);
  const refInput = useRef(null);

	const handleQueryChange = (e, value) => {
		setQuery(value);
	}

  const handleOpenPopper = (e) => {
    if (popperOpen) {
      return;
    }
    setPopperOpen(true);
  };

  const handleClosePopper = (e) => {
    if (!popperOpen) {
      return;
    }
    setPopperOpen(false);
    setQuery("");
  };

  return (
    <div ref={refInput}>
      <SearchBox
        query={query}
        placeholder={placeholder}
        removeable
        inputProps={{
          ...inputProps,
          onClick: handleOpenPopper,
        }}
      />
      <BudaPopper
        referenceElement={refInput.current}
        open={popperOpen}
        onClose={handleClosePopper}
      >
				<Box sx={{ border: 1, marginTop: 10, p: 1, bgcolor: 'background.paper' }}>
          The content of the Popper.
        </Box>
			</BudaPopper>
    </div>
  );
}

export default LiveSearch;
