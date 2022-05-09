import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BudaTableBody from "./BudaTableBody";
import BudaTableHead from "./BudaTableHead";
import BudaTableToolbar from "./BudaTableToolbar";
import { useHistory } from "react-router-dom";
const BudaTable = (props) => {
  const {
    tableChildren,
    modalChildren,
    data,
    headCells,
    Modal,
    DetailTableBody,
    type,
    deleteItems,
    children,
    stickyHeader = true,
    padding,
    size,
    isNotShowCheckBox = false,
    ...remainProps
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(headCells[0].id);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    props.history?.push({
      search: `?page=${newPage}&limit=${rowsPerPage}`,
    });
  };

  const handleRowsPerPageChange = (e) => {
    debugger;
    setRowsPerPage(e.target.value);
    setPage(0);
    props.history?.push({
      search: `?page=${0}&limit=${e.target.value}`,
    });
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

  // useEffect(() => {
  //   !search
  //     ? setDisplay(data)
  //     : setDisplay(
  //         data.filter((item) =>
  //           item[searchBy]
  //             ?.toString()
  //             .toUpperCase()
  //             .includes(search.toString().toUpperCase())
  //         )
  //       );
  // }, [search, searchBy, data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer sx={{ paddingRight: "10px" }}>
          <BudaTableToolbar
            numSelected={selected.length}
            handleOpen={handleOpen}
            handleSearch={(val) => setSearch(val)}
            headCells={headCells}
            searchBy={(val) => setSearchBy(val)}
            deleteItem={() => {
              deleteItems(selected);
              setSelected([]);
            }}
            checkModal={Modal ? true : false}
          />
          <Table
            sx={{ minWidth: 1000 }}
            stickyHeader={stickyHeader}
            {...remainProps}
          >
            <BudaTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headCells={headCells}
              isNotShowCheckbox={isNotShowCheckBox}
            />
            <BudaTableBody
              order={order}
              orderBy={orderBy}
              selected={selected}
              page={page}
              rowPerPage={rowsPerPage}
              setSelected={setSelected}
              data={data}
              DetailTableBody={DetailTableBody}
              type={type}
              isNotShowCheckbox={isNotShowCheckBox}
            />
            {Modal && <Modal isOpen={isOpen} handleClose={handleClose} />}
            {tableChildren}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={600}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default BudaTable;
