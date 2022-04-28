import { Box, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EnhancedToolbar from "./table/EnhancedToolbar";

const CombinedTable = ({ data, headCells, Modal, Body, type, deleteItems }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(data);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const displayData = display.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

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
      const newSelecteds = data.map((n) => n[type]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  useEffect(() => {
    !search
      ? setDisplay(data)
      : setDisplay(
          data.filter((item) =>
            item[searchBy]
              .toString()
              .toUpperCase()
              .includes(search.toString().toUpperCase())
          )
        );
  }, [search, searchBy, data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer sx={{ paddingRight: "10px" }}>
          <EnhancedToolbar
            numSelected={selected.length}
            handleOpen={handleOpen}
            handleSearch={(val) => setSearch(val)}
            headCells={headCells}
            searchBy={(val) => setSearchBy(val)}
            deleteItem={() => {
              deleteItems(selected);
              setSelected([]);
            }}
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
            <Body
              order={order}
              orderBy={orderBy}
              selected={selected}
              page={page}
              rowPerPage={rowsPerPage}
              setSelected={setSelected}
              data={displayData}
            />
            <Modal isOpen={isOpen} handleClose={handleClose} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
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
