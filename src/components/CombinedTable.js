import React, { useState } from "react";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EnhancedToolbar from "./table/EnhancedToolbar";
import EnhancedTableBody from "./table/EnhancedTableBody";
import { Box, Paper, TableContainer, Table } from "@mui/material";
import data from "../assets/data";
import AddCustomerModal from "./modal/AddCustomerModal";

const CombinedTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(30);
  const [isOpen, setIsOpen] = useState(false);

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
            />
            <EnhancedTableBody
              order={order}
              orderBy={orderBy}
              selected={selected}
              page={page}
              rowPerPage={rowPerPage}
              setSelected={setSelected}
            />
            <AddCustomerModal isOpen={isOpen} handleClose={handleClose} />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CombinedTable;
