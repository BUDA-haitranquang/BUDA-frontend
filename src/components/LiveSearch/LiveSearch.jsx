import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { useRef } from "react";
import BudaPopper from "../Popper/BudaPopper";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfiniteScroll from "react-infinite-scroll-component";

LiveSearch.propTypes = {
  handleRender: PropTypes.func,
  fetchData: PropTypes.func,
  placeholder: PropTypes.string,
  createable: PropTypes.bool,
  textCreate: PropTypes.string,
  onClickCreate: PropTypes.func,
  inputProps: PropTypes.object,
  height: PropTypes.number,
  maxHeight: PropTypes.number,
};

function LiveSearch(props) {
  const {
    handleRender,
    fetchData,
    placeholder,
    createable,
    textCreate,
    onClickCreate,
    inputProps,
    height,
    maxHeight,
  } = props;

  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [popperOpen, setPopperOpen] = useState(false);
  const refInput = useRef(null);

  useEffect(() => {
    setOptions(fetchData(""));
  }, []);

  const handleQueryChange = (e, value) => {
    setQuery(value);
    let data = fetchData(value);
    if (data) {
      setOptions(data);
    }
  };

  const handleOpenPopper = (e) => {
    if (popperOpen) {
      return;
    }
    setPopperOpen(true);
  };

  const handleClosePopper = (e) => {
    setPopperOpen(false);
    setQuery("");
  };

  return (
    <div ref={refInput}>
      <SearchBox
        query={query}
        placeholder={placeholder}
        onChange={handleQueryChange}
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
        <Box>
          {popperOpen && createable && (
            <Button
              startIcon={<AddCircleOutlineIcon color="primary" />}
              onClick={onClickCreate}
              sx={{ textTransform: "none" }}
            >
              <Typography variant="subtitle1" color="primary">
                {textCreate}
              </Typography>
            </Button>
          )}
          {popperOpen && options && options.length > 0 ? (
            <InfiniteScroll
              dataLength={options.length}
              loader={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  py={2}
                >
                  <CircularProgress size={16} />
                </Box>
              }
              height={height || "auto"}
              style={{ maxHeight: maxHeight }}
            >
              {options.map((option, idx) => handleRender(option))}
            </InfiniteScroll>
          ) : (
            <div></div>
          )}
        </Box>
      </BudaPopper>
    </div>
  );
}

export default LiveSearch;
