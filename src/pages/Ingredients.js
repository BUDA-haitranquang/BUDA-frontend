import {ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import {Container, Toolbar } from "@mui/material";
import { makeStyles} from "@material-ui/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Provider } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete"
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddIngredientForm from "../components/forms/AddIngredientForm";
import store from "../components/forms/store";
import showResult from "../components/forms/showResult";

const useStyles = makeStyles({
  root: {
    letterSpacing: 0,
    "& .MuiDataGrid-root": {
      border: "2px solid gray",
    },
    "& .MuiDataGrid-main": {
      borderBottom: "2px solid gray",
      borderTop: "1spx solid #5c938f",
    },
    "& .MuiDataGrid-toolbarContainer": {
      justifyContent: "flex-end",
      padding: ".6rem",
      fontSize: 14,
      backgroundColor: "#d6fadf",
    },
    "& .MuiDataGrid-columnHeaderWrapper": {
      border: "1px solid gray",
      backgroundColor: "#91ffcc",
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        padding: 0,
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: 16,
          fontWeight: 600,
          color: "#355a3f"
        },
      },
      "& .MuiSvgIcon-root": {
        visibility: "visble",
        fill: "#5c938f",
      }
    },
    
    "& .MuiDataGrid-row": {
      letterSpacing: 0,
      // "&:nth-child(2n)": {
      //   backgroundColor: "#d6f58e",
      // },
      "& .MuiDataGrid-cell": {
        border: "1px solid gray",
        paddingRight: "2px",
      },
    },
    "& .MuiButtonGroup-contained": {
      paddingTop: ".4rem",
      width: "100%",
      justifyContent: "flex-end",
    },
    "& .MuiFormControl-root": {
      width: "100%"
    }
  },
});


const Ingredients = (props) => {
  const {window} = props;
  const classes = useStyles();

  const columns = [
    { 
      field: "id", 
      type: "number",
      headerName: "ID", 
      width: 70, 
      disableColumnMenu: "true", 
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginLeft: "-8px"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },
    { field: "title", headerName: "Name", width: 250 },
    { 
      field: "price", 
      headerName: "Price", 
      width: 110,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              marginLeft: "-4px"
            }}
          >
            {cellValues.value}
          </div>
        );
      } 
    },
    { field: "category", headerName: "Category", width: 160, sortable: false },
    { field: "rating[{count}]", headerName: "Amount", width: 110},
    { field: "description", headerName: "Description", width: 300, sortable: false },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const [loading, setLoading] = useState(true)
  const getData = () => {
    axios.get(`https://fakestoreapi.com/products`).then(res => {
      setRows(res.data);
    }).then(()=>setLoading(false));
    // fetch('https://fakestoreapi.com/products')
		// 	.then((res) => res.json())
		// 	.then(
		// 		(data) => {
		// 			console.log('result', data);
		// 			// let id = 1;
		// 			// const dataWithId = data.map((x) =>
		// 			// 	Object.assign({}, x, { id: id++ })
		// 			// );
		// 			// // console.log('dataWithId', dataWithId);
    //       setRows(data);
		// 		},
		// 		(error) => {
		// 			console.log('error', error);
		// 		}
		// 	);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [addDisplay, setAddDisplay] = useState("none");
  const handleAddButtonClick = () => {
    setAddDisplay("flex");
  }
  const handleDelete = () => {
    
  }
  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
    console.log(selection);
  }

  return (
    <Box sx={{ display: "flex" }} >
      <Sidebar window={window} name="Products" />
      <Container className={classes.root}>
        <Toolbar />
        <Container >
        <div style={{ height: 420, width: "100%" }} className={classes.root}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        loading={loading}
        onSelectionModelChange={handleSelectionChange}
      />

      <ButtonGroup variant="contained">
        <Button 
          color="success" 
          startIcon={<AddBoxIcon/>} 
          onClick={handleAddButtonClick}
        >
          Add Item
        </Button>

        <Button 
          color="error" 
          endIcon={<DeleteIcon/>} 
          onClick={handleDelete}
        >
          Delete Item(s)
        </Button>
      </ButtonGroup>

      <Provider store={store}>
        <div style={{
            display: `${addDisplay}`,
            flexDirection: "column",
            flex: 1,
            alignItems: "flex-end",
          }
        }>
          <div style={{
            width: "40%",
            padding: "0 1rem .5rem 1rem",
            backgroundColor: "rgb(214 250 223)",
            marginTop: ".4rem",
            borderRadius: 4,
            }
          }>
            <h2 style={{
              color:"#457f8d",
              textAlign: "center",
              margin: ".2rem",
              }
            }>
              New Ingredient
            </h2>
            <AddIngredientForm onSubmit={showResult}/>
          </div>
        </div>
        
      </Provider>
      
    </div>
        </Container>
      </Container>
    </Box>
    
  );
};

export default Ingredients;
