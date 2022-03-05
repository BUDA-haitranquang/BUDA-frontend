import React from "react";
import PropTypes from "prop-types";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { useRef } from "react";
import BudaPopper from "../Popper/BudaPopper";
import { Box, CircularProgress, List, ListItem, Paper, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfiniteScroll from "react-infinite-scroll-component";

LiveSearch.propTypes = {
  data: PropTypes.array,
  handleRender: PropTypes.func,
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
    data,
    handleRender,
    placeholder,
    createable,
    textCreate,
    onClickCreate,
    inputProps,
    height,
    maxHeight,
  } = props;

  const [query, setQuery] = useState("");
  const [popperOpen, setPopperOpen] = useState(false);
  const refInput = useRef(null);

  const handleQueryChange = (e, value) => {
    setQuery(value);
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
            >
              <Typography variant="subtitle1" color="primary">
                {textCreate}
              </Typography>
            </Button>
          )}
          {popperOpen && data && data.length > 0 ? (
            <InfiniteScroll
              dataLength={data.length}
              loader={
                <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                  <CircularProgress size={16} />
                </Box>
              }
              height={height|| "auto"}
              style={{ maxHeight: maxHeight }}
            >
              {data.map((dataItem, idx) =>
                handleRender(dataItem)
              )}
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
