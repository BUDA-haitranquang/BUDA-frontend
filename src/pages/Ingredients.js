import {ButtonGroup } from "@material-ui/core";
import Button from "@mui/material/Button";
import { makeStyles} from "@material-ui/styles";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete"
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": {
        backgroundColor: "#d6f58e",
      }
      
    },
  },
});
const Ingredients = () => {
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "Num", width: 140 },
    { field: "Country", headerName: "Name", width: 250 },
    { field: "Slug", headerName: "Amount", width: 250 },
    { field: "ISO2", headerName: "Note", width: 140 },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://api.covid19api.com/countries")
      .then((res) => res.json())
      .then(
        (data) => {
          let id = 1;
          const dataWithId = data.map((x) =>
            Object.assign({}, x, { id: (id ++) })
          );
          setRows(dataWithId);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleAdd = () => {
    
  }
  const handleDelete = () => {

  }
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        checkboxSelection
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={10}
      />
      <ButtonGroup variant="contained">
        <Button color="success" startIcon={<AddBoxIcon/>} onClick={handleAdd}>Add new Item</Button>
        <Button color="error" endIcon={<DeleteIcon/>} onClick={handleDelete}>Delete selected Item</Button>
      </ButtonGroup>
    </div>
  );
};

export default Ingredients;
