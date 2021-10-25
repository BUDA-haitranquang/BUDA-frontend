import React, { useState } from "react";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EnhancedToolbar from "./table/EnhancedToolbar";
import EnhancedTableBody from "./table/EnhancedTableBody";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TablePagination,
} from "@mui/material";
import AddCustomerModal from "./modal/AddCustomerModal";
import AddProductModal from "./modal/AddProductModal";

const CombinedTable = ({ data, headCells, Modal }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const displayData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleRequestSort = (e, props) => {
    const isAsc = orderBy === props && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(props);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  console.log(displayData);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer>
          <EnhancedToolbar
            numSelected={selected.length}
            handleOpen={handleOpen}
          />
          <Table sx={{ minWidth: 1000 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headCells={headCells}
            />
            <EnhancedTableBody
              order={order}
              orderBy={orderBy}
              selected={selected}
              page={page}
              rowPerPage={rowsPerPage}
              setSelected={setSelected}
              data={displayData}
            />
            {/* <AddCustomerModal isOpen={isOpen} handleClose={handleClose} /> */}
            <Modal isOpen={isOpen} handleClose={handleClose}/>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default CombinedTable;
