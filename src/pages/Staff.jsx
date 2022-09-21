import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../buda-components/table/BudaTable";
import AddStaffModal from "../components/modal/AddStaffModal";
import StaffTableBody from "../components/table/body/StaffTableBody";
import { DELETE_STAFF_MUTATION } from "../graphQl/staff/staffMutation";
import { LOAD_STAFFS } from "../graphQl/staff/staffQueries";

const Staff = (props) => {
  const [staffs, setStaffs] = useState([]);
  const { t } = useTranslation(["common", "staff"]);
  const { error, loading, data } = useQuery(LOAD_STAFFS);
  const [deleteStaff] = useMutation(DELETE_STAFF_MUTATION);
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
      label: t("staff:Name"),
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: t("common:Email"),
    },
    {
      id: "phoneNumber",
      numeric: false,
      disablePadding: true,
      label: t("common:PhoneNumber"),
    },
    {
      id: "address",
      numeric: false,
      disablePadding: true,
      label: t("common:Address"),
    },
    {
      id: "staffPosition",
      numeric: false,
      disablePadding: true,
      label: t("staff:Position"),
    },
  ];
  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach((item) => {
      deleteStaff({
        variables: { staffID: parseInt(item) },
        refetchQueries: [{ query: LOAD_STAFFS }],
      });
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (data)
        setStaffs(
          data.staffsByUser
            .slice()
            .sort((a, b) => b.staffID - a.staffID)
        );
    }

    fetchData();
  }, [data]);

  // if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
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
            data={staffs}
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
