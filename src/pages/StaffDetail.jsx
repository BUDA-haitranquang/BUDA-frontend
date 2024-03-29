import { useMutation, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CombinedDetail from "../components/CombinedDetail";
import StaffInformation from "../components/detail/information/StaffInformation";
import EditStaffModal from "../components/modal/EditStaffModal";
import { DELETE_STAFF_MUTATION } from "../graphQl/staff/staffMutation";
import { LOAD_STAFF, LOAD_STAFFS } from "../graphQl/staff/staffQueries";

const StaffDetail = (props) => {
  const { id } = useParams();
  const history = useHistory();

  const [staff, setStaff] = useState(null);

  const { data } = useQuery(LOAD_STAFF, {
    variables: { staffID: parseInt(id) },
  });

  const [deleteStaff] = useMutation(DELETE_STAFF_MUTATION);

  const handleDeleteStaff = () => {
    deleteStaff({
      variables: { staffID: parseInt(id) },
      refetchQueries: [{ query: LOAD_STAFFS }],
    }).then(history.push("/staff"));
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setStaff(data);
    }

    fetchData();
  }, [data]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        {staff === null ? (
          <div></div>
        ) : (
          <CombinedDetail
            data={staff}
            Modal={EditStaffModal}
            Information={StaffInformation}
            handleDelete={handleDeleteStaff}
          />
        )}
      </Box>
    </Box>
  );
};

export default StaffDetail;
