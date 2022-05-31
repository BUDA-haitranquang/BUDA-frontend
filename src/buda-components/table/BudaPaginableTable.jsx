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
import { isNull } from "lodash";

const BudaPaginableTable = (props) => {
  const {
    data,
    headCells,
    onSearch,
    page = 0,
    onPageChange,
    rowsPerPage = 50,
    onRowsPerPageChange,
    total,
    deleteItems,
    tableChildren,
    modalChildren,
    Modal,
    DetailTableBody,
    type,
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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchBy, setSearchBy] = useState(headCells[0].id);

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
    if (selected && selected.length) {
      setSelected([]);
    }

    if (onSearch && !isNull(search)) {
      onSearch(searchBy, search);
    }
  }, [search, searchBy]);

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
            checkModal={!!Modal}
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
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default BudaPaginableTable;
