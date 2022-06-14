import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
import BudaModal from "../../../buda-components/modal/BudaModal";
import ProductDetailPrintForm from "../../printforms/ProductDetailPrintForm";

const PrintProductModal = ({ isOpen, handleClose, sku }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common", "print"]);

  const componentRef = useRef();

  const [numCopy, setNumCopy] = useState(1);
  //   const [newCustomer, { error }] = useMutation(ADD_CUSTOMER_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setNumCopy("");
  };

  const printProduct = () => {
    setIsLoading(true);
    // newCustomer({
    //   variables: {
    //     name: name,
    //     phoneNumber: phoneNumber,
    //     address: address,
    //     totalSpend: parseFloat(totalSpend),
    //     gender: gender,
    //     ageGroup: ageGroup,
    //   },
    //   refetchQueries: [{ query: LOAD_CUSTOMERS }],
    // })
    //   .then((res) => {
    //     handleClose();
    //     enqueueSnackbar("Add successfully", AlertSuccessProp);
    //   })
    //   .then(resetForm())
    //   .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
    //   .finally(setIsLoading(false));
  };

  const isValid = () => {
    return numCopy > 0;
  };

  const handleSubmit = () => {
    if (isValid()) printProduct();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      title={t("print:enterNumCopy")}
      isNotShowFooter={true}
      isLoading={isLoading}
      children={
        <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "300px",
            height: "90px",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            required
            sx={{ width: "60px" }}
            id="outlined-basic"
            type="number"
            variant="outlined"
            value={numCopy}
            onChange={(e) => setNumCopy(e.target.value)}
          />
          <Box maxWidth={150} mt={3} sx={{ position: "fixed", left: "100vw" }}>
            <ProductDetailPrintForm
              ref={componentRef}
              sku={sku}
              numCopy={numCopy}
            />
            {/* button to trigger printing of target component */}
            <ReactToPrint
              trigger={() => (
                <Button
                  sx={{ position: "fixed", right: "30px", bottom: "50px" }}
                  variant="contained"
                >
                  <PrintIcon style={{ marginRight: "10px" }} />
                  Barcode
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle={"Product: " + sku}
            />
          </Box>
        </Box>
      }
    ></BudaModal>
  );
};
export default PrintProductModal;
