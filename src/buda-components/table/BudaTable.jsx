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
import { useTranslation } from "react-i18next";
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
    printable,
    printItems,
    children,
    stickyHeader = true,
    padding,
    size,
    isNotShowCheckBox = false,
    toolbar = true,
    minWidth = 1000,
    maxRow = [20, 50, 100], //array
    tableName = 'Data',
    ...remainProps
  } = props;
  const { t } = useTranslation(["common"]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(maxRow[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(data);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(headCells[0].id);


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
      const newSelecteds = display.map((n) => n[type]);
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
              ?.toString()
              .toUpperCase()
              .includes(search.toString().toUpperCase())
          )
        );
  }, [search, searchBy, data]);

  console.log(data);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer sx={{ paddingRight: "10px" }}>
          {toolbar && (
            <BudaTableToolbar
              title = {tableName}
              numSelected={selected.length}
              handleOpen={handleOpen}
              handleSearch={(val) => setSearch(val)}
              headCells={headCells}
              searchBy={(val) => setSearchBy(val)}
              deleteItem={() => {
                deleteItems(selected);
                setSelected([]);
              }}
              printable={printable}
              printItem={() => {
                printItems(selected);
                setSelected([]);
              }}
              checkModal={Modal ? true : false}
            />
          )}
          <Table
            sx={{ minWidth: minWidth }}
            stickyHeader={stickyHeader}
            {...remainProps}
          >
            <BudaTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={display.length}
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
              data={displayData}
              DetailTableBody={DetailTableBody}
              type={type}
              isNotShowCheckbox={isNotShowCheckBox}
            />
            {Modal && <Modal isOpen={isOpen} handleClose={handleClose} />}
            {tableChildren}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={maxRow}
          component="div"
          count={display.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          // labelRowsPerPage = {t('common:rowsPerPage')}
        />
      </Paper>
    </Box>
  );
};

export default BudaTable;
