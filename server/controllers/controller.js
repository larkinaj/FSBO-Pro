const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const templatePDFLocation = "../pdf-files/VA-Residential-Purchase-Agreement.pdf";
const outputPDFLocation = '../pdf-files/example.pdf'
const { dateConverter } = require('../helperFunctions/helper.js')

const fileController = {};

fileController.fillPDF = async (req, res, next) => {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, templatePDFLocation)))

  const fieldNames = pdfDoc
    .getForm()
    .getFields()
    .map((f) => f.getName())
  // console.log(fieldNames)

///////////////////////////////////////////////////////////////////////////////////
  // // The optimal way to do this would be to match the state array index with the pdf field index,
  // // that way I would not need any nested loops.
  // // Do not delete this code. I will possibly come back to this later
  // fieldNames.forEach((possibleField, i) => {
  //   try {
  //     for (let j = 0; j < req.body.length; j++) {
  //       if (i === Number(req.body[j].pdfIndex)) {
  //         form.getTextField(possibleField).setText(req.body[j].buyerFName + ' ' + req.body[j].buyerLName)
  //       }
  //     }
  //     // form.getTextField(possibleField)
  //     // .setText(`${i}: ${possibleField}`)
  //   } catch (error) {

  //   }
  // })
////////////////////////////////////////////////////////////////////////////////////

  const form = pdfDoc.getForm();

  //form.getTextField('made on').setText(req.body[39].effectiveDate.slice(5))
  form.getTextField('made on').setText(dateConverter(req.body[39].effectiveDate))
  form.getTextField('20').setText(req.body[39].effectiveDate.slice(2, 10 - 6))
  form.getTextField('Buyer').setText(req.body[7].buyerFName + ' ' + req.body[7].buyerLName)
  form.getTextField('Buyer_2').setText(
    req.body[9].buyAddressLine1 + ' ' + 
    req.body[9].buyAddressLine2 + ' ' + 
    req.body[9].buyCity + ' ' +
    req.body[9].buyState + ' ' +
    req.body[9].buyZip
  )
  form.getTextField('Seller').setText(req.body[11].sellerFName + ' ' + req.body[11].sellerLName)
  form.getTextField('Seller_2').setText(
    req.body[13].sellAddressLine1 + ' ' + 
    req.body[13].sellAddressLine2 + ' ' + 
    req.body[13].sellCity + ' ' +
    req.body[13].sellState + ' ' +
    req.body[13].sellZip
  )
  switch(req.body[0].type) {
    case 'singleFamily':
      form.getCheckBox('SingleFamily Home').check()
      break;
    case 'condominium': 
      form.getCheckBox('Condominium').check()
      break;
    case 'plannedUnit':
      form.getCheckBox('Planned Unit Development PUD').check()
      break;
    case 'duplex':
      form.getCheckBox('Duplex').check()
      break;
  }
  // form.getTextField('Triplex').setText('23')
  // form.getTextField('Fourplex').setText('23')
  // form.getTextField('Other').setText('23')
  // form.getTextField('undefined').setText('23')
  form.getTextField('Street Address').setText(
    req.body[2].propAddressLine1 + ' ' + 
    req.body[2].propAddressLine2 + ' ' + 
    req.body[2].propCity + ' ' +
    req.body[2].propState + ' ' +
    req.body[2].propZip
  )
  form.getTextField('Tax Parcel Information').setText(req.body[3].taxParcelInfo)
  form.getTextField('Other Description').setText(req.body[3].otherLegalDescript)
  form.getTextField('Text1').setText(req.body[4].propertyList)
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  form.getTextField('US Dollars').setText(Number(req.body[14].numericPrice).toLocaleString())
  form.getTextField('payment of').setText(req.body[14].textPrice)
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')
  // form.getTextField('20').setText('23')



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