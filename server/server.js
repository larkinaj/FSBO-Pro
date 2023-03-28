const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const express = require('express');
const fs = require('fs')
const fileController = require('./controllers/controller');
const templatePDFLocation = "./pdf-files/VA-Residential-Purchase-Agreement.pdf";
const outputPDFLocation = './pdf-files/example.pdf'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.get("/login", async (req, res) => {
  // const pdfDoc = await PDFDocument.load(fs.readFileSync(templatePDFLocation))
  // const pdfBytes = await pdfDoc.save()
  // await fs.writeFile(test.pdf, )  
  res.setHeader('Content-Type', 'application/pdf');
  //res.download(path.join(__dirname, templatePDFLocation))
  res.sendFile(path.join(__dirname, templatePDFLocation))
})

app.post("/create", fileController.fillPDF, async (req, res) => {
  // res.send(res.locals.fieldNames)
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(path.join(__dirname, outputPDFLocation))
})

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});