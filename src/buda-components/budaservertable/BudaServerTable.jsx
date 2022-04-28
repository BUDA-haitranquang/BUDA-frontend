import { Box, Paper, Table, TableContainer, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import BudaServerTableBody from "./BudaServerTableBody";
import BudaServerTableHead from "./BudaServerTableHead";
import BudaServerTableToolbar from "./BudaServerTableToolbar";
import { useQuery } from "@apollo/client";
import { LOAD_SELL_ORDER } from "../../graphQl/sellOrder/sellOrderQueries";
import { capitalizeFirstLetter } from "../../utils/utils";

const BudaServerTable = (props) => {
  const {
    tableChildren,
    modalChildren,
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
    searchBar = true,
    ...remainProps
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(headCells[0].id);
  const { data, refetch } = useQuery(LOAD_SELL_ORDER, {
    variables: {
      page: parseInt(page),
      size: parseInt(rowsPerPage)
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const displayData = display;
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

  useEffect(() => {
    const loadData = async () => {
      if (data) {
        let sellorder = data.sellOrdersByUser.map((item) => {
          return {
            id: item.sellOrderID,
            customerName: item.customer?.name,
            sellOrderID: item.textID,
            finalCost: item.finalCost,
            creationTime: (item.creationTime),
            finishTime: (item.finishTime),
            status: capitalizeFirstLetter(item.status)
          };
        });
        setDisplay(sellorder);
      }
    };
    loadData();
  }, [data]);
  useEffect(() => {
    refetch();
    setSelected([]);
  }, [page, rowsPerPage]);

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = display.map((n) => n[type]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //   useEffect(() => {
  //     !search
  //       ? setDisplay(data)
  //       : setDisplay(
  //           data.filter((item) =>
  //             item[searchBy]
  //               .toString()
  //               .toUpperCase()
  //               .includes(search.toString().toUpperCase())
  //           )
  //         );
  //   }, [search, searchBy, data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer sx={{ paddingRight: "10px" }}>
          <BudaServerTableToolbar
            numSelected={selected.length}
            handleOpen={handleOpen}
            handleSearch={(val) => setSearch(val)}
            headCells={headCells}
            searchBar={searchBar}
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
            <BudaServerTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={display.length}
              headCells={headCells}
              isNotShowCheckbox={isNotShowCheckBox}
            />
            <BudaServerTableBody
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
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          nextIconButtonProps={
            displayData.length === 0
              ? {
                disabled: true
              }
              : undefined
          }
        />
      </Paper>
    </Box>
  );
};

export default BudaServerTable;
