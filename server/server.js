const path = require('path');
const { PDFDocument } = require('pdf-lib');
const vaResPurchaseAgreement = "./pdf-files/VA-Residential-Purchase-Agreement.pdf";
const express = require('express');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.get("/data", async (req, res) => {
  // const pdfDoc = await PDFDocument.load(fs.readFileSync(vaResPurchaseAgreement))
  // const pdfBytes = await pdfDoc.save()
  // await fs.writeFile(test.pdf, )  
  res.setHeader('Content-Type', 'application/pdf');
  //res.download(path.join(__dirname, vaResPurchaseAgreement))
  res.sendFile(path.join(__dirname, vaResPurchaseAgreement))
})


app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});