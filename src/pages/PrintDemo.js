import { Button } from "@mui/material";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintDemo() {
  const componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
        />

        {/* component to be printed */}
        <ComponentToPrint ref={componentRef} testStr="In cai nay ra man hinh di"/>
      </div>
    </>
  );
}
