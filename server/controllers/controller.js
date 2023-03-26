const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const templatePDFLocation = "../pdf-files/VA-Residential-Purchase-Agreement.pdf";
const outputPDFLocation = '../pdf-files/example.pdf'

const fileController = {};

fileController.fillPDF = async (req, res, next) => {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, templatePDFLocation)))

  const fieldNames = pdfDoc
    .getForm()
    .getFields()
    .map((f) => f.getName())
    
  const form = pdfDoc.getForm();

  form.getTextField('made on').setText('Mar 24th')
  form.getTextField('20').setText('23')
  form.getTextField('Buyer').setText(req.body[7].buyerFName + ' ' + req.body[7].buyerLName)
  form.getCheckBox('SingleFamily Home').check()

  const pdfBytes = await pdfDoc.save()

  fs.writeFileSync(path.join(__dirname, outputPDFLocation), pdfBytes)

  return next();
};

fileController.createPDF = async (req, res, next) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  console.log('width: ', width)
  console.log('height: ', height)
  const text = 'RESIDENTIAL SALES CONTRACT (Virginia)';
  const fontSize = 24;

  page.drawText(text, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    color: rgb(0, 0.53, 0.71),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '../pdf-files/example.pdf'), pdfBytes);
  return next();
};


module.exports = fileController;