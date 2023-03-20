import React, { useState } from "react";
import { PDFDocument } from 'pdf-lib';
//import vaResPurchaseAgreement from "../pdfs/VA-Residential-Purchase-Agreement.pdf";

const PurchaseAgreeFill = (props) => {

  const handleClick = async () => {
    fetch('http://localhost:3000/data')
    .then(res => {
      console.log(res)
      return res.blob()
    })
    .then(blob => {
      // const pdfDoc = await PDFDocument.load(fs.readFileSync(vaResPurchaseAgreement))  
      console.log(blob, 'test222')  
      // const pdfBytes = await test.save()
      const fileURL = window.URL.createObjectURL(blob);
      console.log('fileURL: ', fileURL)
      window.open(fileURL);
      // Setting various property values
      // let alink = document.createElement('a');
      // alink.href = fileURL;
      // alink.download = 'SamplePDF.pdf';
      // alink.click();
      // (C2) CLEAN UP
      // window.URL.revokeObjectURL(fileURL);
      // document.removeChild(alink);
    })
    .catch((err) => console.error(err))
  }


  // console.log(doc.loadFile(vaResPurchaseAgreement))

  return (
    <div>
      PurchaseAgreeFill Test: 
      <button onClick={handleClick}>SAVE AGREEMENT</button>
    </div>
  )
}

export default PurchaseAgreeFill;