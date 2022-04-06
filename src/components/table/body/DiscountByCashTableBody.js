import React, { Fragment } from "react";
import { TableCell } from "@mui/material";
import { Link } from "react-router-dom";

const StaffTableBody = (props) => {
  const { row, labelId } = props;

// const useStyle = makeStyles({
//     root: {
//       "& MuiTableCell-root":{
//           padding: 0
//       }
//     },
//   });

// const DiscountTableBody = ({
//   order,
//   orderBy,
//   selected,
//   page,
//   rowPerPage,
//   setSelected,
//   data,
// }) => {
//   const handleClick = (e, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const classes = useStyle();

//   const isSelected = (id) => selected.indexOf(id) !== -1;
//   // console.log(data);
//   return (
//     <TableBody className={classes.root}>
//       {stableSort(data, getComparator(order, orderBy)).map((row, idx) => {
//         const isItemSelected = isSelected(row.discountID);
//         const labelId = `enhanced-table-checkbox-${idx}`;
//         return (
//           <CustomWidthTooltip title={row.description}>
//             <TableRow 
//               sx={{ cursor: "pointer" }}
//               hover
//               onClick={(e) => handleClick(e, row.discountID)}
//               role="checkbox"
//               aria-checked={isItemSelected}
//               tabIndex={-1}
//               key={row.name}
//               selected={isItemSelected}
//             >
//               <TableCell align="center" padding="checkbox">
//                 <Checkbox
//                   color="primary"
//                   checked={isItemSelected}
//                   inputProps={{ "aria-labelledby": labelId }}
//                 />
//               </TableCell>
//               {/* <TableCell align="right">{row.id}</TableCell> */}
//               <TableCell component="th" id={labelId} scope="row" >
//                 {row.name}
//               </TableCell>

//               <TableCell align="right">{row.cash}</TableCell>
//               <TableCell align="right">{row.cashLimit}</TableCell>
//               <TableCell align="right">{row.orderCount}</TableCell>
//               <TableCell align="left">{row.createdTime}</TableCell>
//               <TableCell align="left">{row.expiryTime}</TableCell>
   
//             </TableRow>
//           </CustomWidthTooltip>
//         );
//       })}
//     </TableBody>
  return (
    <Fragment>
      <TableCell component="th" id={labelId} scope="row" >
        <Link
          to={{
            pathname: `staff/${row.staffID}`,
          }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.name}
        </Link>
      </TableCell>

      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">{row.phoneNumber}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
      <TableCell align="left">{row.staffPosition}</TableCell>
    </Fragment>
  );
};

// export default DiscountTableBody;
