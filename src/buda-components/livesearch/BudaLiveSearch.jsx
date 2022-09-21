import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SearchBox from "../searchbox/BudaSearchBox";
import { useState } from "react";
import { useRef } from "react";
import BudaPopper from "../popper/BudaPopper";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfiniteScroll from "react-infinite-scroll-component";
import useStyles from "./BudaLiveSearch.styles";

LiveSearch.propTypes = {
  handleRender: PropTypes.func,
  fetchData: PropTypes.func,
  onChooseItem: PropTypes.func,
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
    onChooseItem,
    placeholder,
    createable,
    textCreate,
    onClickCreate,
    inputProps,
    height,
    maxHeight,
    style,
  } = props;

  const classes = useStyles();

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

  const handleOpenPopper = () => {
    if (popperOpen) {
      return;
    }
    setPopperOpen(true);
  };

  const handleClosePopper = () => {
    setPopperOpen(false);
    setQuery("");
  };

  return (
    <div
      className={classes.root}
      ref={refInput}
      style={{ width: 230, ...style}}
    >
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
        <Box className={classes.content}>
          {popperOpen && createable && (
            <Button
              className="BudaLiveSearch-btnCreate"
              startIcon={<AddCircleOutlineIcon color="primary" />}
              onClick={onClickCreate}
              sx={{ textTransform: "none", width: "100%" }}
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
              {options.map((option, idx) => (
                <Box
                  className="BudaLiveSearch-option"
                  key={idx}
                  onClick={() => {
                    onChooseItem(option);
                    handleClosePopper();
                  }}
                  key-event="true"
                  tabIndex={0}
                >
                  {handleRender(option)}
                </Box>
              ))}
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
