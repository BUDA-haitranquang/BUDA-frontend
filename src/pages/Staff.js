import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddStaffModal from "../components/modal/AddStaffModal";
import Sidebar from "../components/Sidebar";
import StaffTableBody from "../components/table/body/StaffTableBody";
import { DELETE_STAFF_MUTATION } from "../graphQl/staff/staffMutation";
import { LOAD_STAFFS } from "../graphQl/staff/staffQueries";
import BudaTable from "../buda-components/table/BudaTable";

const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "ID",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email"
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: true,
    label: "Phone number"
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address"
  },
  {
    id: "staffPosition",
    numeric: false,
    disablePadding: true,
    label: "Position"
  }
];

const Staff = (props) => {
  const { window } = props;
  const [staffs, setStaffs] = useState([]);
  const { error, loading, data } = useQuery(LOAD_STAFFS);
  const [deleteStaff] = useMutation(DELETE_STAFF_MUTATION);

  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach(
      (item) => {
        deleteStaff({
          variables: { staffID: parseInt(item) },
          refetchQueries: [{ query: LOAD_STAFFS }]
        });
      }
    );
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setStaffs(data.staffsByUser.slice().sort((a, b) => b.staffID - a.staffID));
    }

    fetchData();
  }, [data]);

  if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Staff" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box>
          <BudaTable
            deleteItems={handleDelete}
            data={staffs.reverse()}
            headCells={headCells}
            Modal={AddStaffModal}
            DetailTableBody={StaffTableBody}
            type="staffID"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Staff;
