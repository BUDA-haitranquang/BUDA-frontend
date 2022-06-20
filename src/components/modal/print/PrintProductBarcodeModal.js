import PrintIcon from "@mui/icons-material/Print";
import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";
import BudaModal from "../../../buda-components/modal/BudaModal";
import ProductBarcodePrintForm from "../../printforms/ProductBarcodePrintForm";

const PrintProductBarcodeModal = ({ isOpen, handleClose, sku }) => {
  const { t } = useTranslation(["common", "print"]);

  const componentRef = useRef();

  const [numCopy, setNumCopy] = useState(1);

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      title={t("print:enterNumCopy")}
      isNotShowFooter={true}
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
            <ProductBarcodePrintForm
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
export default PrintProductBarcodeModal;
