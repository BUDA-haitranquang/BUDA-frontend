import React, { useRef } from "react";
import BudaModal from "../../../buda-components/modal/BudaModal";
import SellOrderDetailPrintForm from "../../../components/printforms/SellOrderDetailPrintForm";
import PrintDemo from "../../PrintDemo";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print";

const PrintSellOrderModal = ({ open, handleClose, sellOrder }) => {
  const componentRef = useRef();
  console.log(sellOrder);
  return (
    <BudaModal
      open={open}
      onClose={handleClose}
      textOk={"print"}
      title={"Print Sell Order"}
      isNotShowFooter={true}
      children={
        <div>
          {/* component to be printed */}
          <SellOrderDetailPrintForm ref={componentRef} sellOrder={sellOrder} />
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => <Button sx={{marginTop: "20px"}} variant="contained">Print</Button>}
            content={() => componentRef.current}
            documentTitle={"Sell-Order" + sellOrder?.textID}
          />
        </div>
      }
    ></BudaModal>
  );
};

export default PrintSellOrderModal;
