const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const templatePDFLocation = "../pdf-files/templates/VA-Residential-Purchase-Agreement.pdf";
const { dateConverter } = require('../helperFunctions/helper.js')
const db = require('../models/database');


const fileController = {};

fileController.fillPDF = async (req, res, next) => {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, templatePDFLocation)))
  const form = pdfDoc.getForm();

  // const fieldNames = pdfDoc
  //   .getForm()
  //   .getFields()
  //   .map((f) => f.getName())
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
  // form.getTextField('a payment in the amount of').setText('23')
  // form.getTextField('The Earnest Money shall be applied to the Purchase Price at Closing and').setText('23')
  // form.getTextField('at').setText('23')
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

  const { userID, comments }  = req.body[40]

  const pdfBytes = await pdfDoc.save()

  const documentInsertQuery = {
    text: 'INSERT INTO documents (user_id, title, file_path, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
    values: [userID, 'Residential Purchase Agreement', '/path/to/my/document', 'NOW()'],
  };
  const documentInsert = await db.query(documentInsertQuery.text, documentInsertQuery.values)
  const outputPDFLocation = `../pdf-files/userID${userID}/docID${documentInsert.rows[0].id}`
  const documentUpdateQuery = {
    text: 'UPDATE documents SET file_path = $1 WHERE id = $2',
    values: [outputPDFLocation + '/version1.pdf', documentInsert.rows[0].id]
  };
  const pathUpdate = await db.query(documentUpdateQuery.text, documentUpdateQuery.values)
  const documentRevisionQuery = {
    text: "INSERT INTO document_revisions (document_id, user_id, file_path, revision_number, revision_date, comments, form_data) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    values: [documentInsert.rows[0].id, userID, outputPDFLocation + '/version1.pdf', 1, 'NOW()', comments, {formData: req.body}]
  };
  const firstRevision = await db.query(documentRevisionQuery.text, documentRevisionQuery.values)

  fs.mkdirSync(path.join(__dirname, outputPDFLocation), {recursive: true})
  fs.writeFileSync(path.join(__dirname, outputPDFLocation + '/version1.pdf'), pdfBytes)
  res.locals.filePath = path.join(__dirname, outputPDFLocation + '/version1.pdf')

  return next();
};


fileController.retrievePDF = async (req, res, next) => {
  console.log('editPDF middleware')
  const editDocumentQuery = {
    text: 'SELECT documents.title, document_revisions.revision_number, document_revisions.revision_date, document_revisions.comments, document_revisions.form_data FROM documents JOIN document_revisions ON documents.id = document_revisions.document_id WHERE documents.id = $1 ORDER BY document_revisions.revision_number DESC',
    values: [req.body.docID]
  };
  const editDocument = await db.query(editDocumentQuery.text, editDocumentQuery.values)
  res.locals.revisions = editDocument.rows
  return next()
};

fileController.saveEdit = async (req, res, next) => {
  console.log('saveEdit middleware')
  const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, templatePDFLocation)))
  const form = pdfDoc.getForm();

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
  // form.getTextField('a payment in the amount of').setText('23')
  // form.getTextField('The Earnest Money shall be applied to the Purchase Price at Closing and').setText('23')
  // form.getTextField('at').setText('23')
  form.getTextField('US Dollars').setText(Number(req.body[14].numericPrice).toLocaleString())
  form.getTextField('payment of').setText(req.body[14].textPrice)

  const pdfBytes = await pdfDoc.save()
  const { docID, userID, latestRevision, comments} = req.body[40]
  const newRevision = latestRevision + 1
  const outputPDFLocation = `../pdf-files/userID${userID}/docID${docID}/version${newRevision}.pdf`
  const saveEditQuery = {
    text: "INSERT INTO document_revisions (document_id, user_id, file_path, revision_number, revision_date, comments, form_data) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    values: [docID, userID, outputPDFLocation, newRevision, 'NOW()', comments, {formData: req.body}]
  };
  const saveEdit = await db.query(saveEditQuery.text, saveEditQuery.values)
  fs.writeFileSync(path.join(__dirname, outputPDFLocation), pdfBytes)
  res.locals.filePath = path.join(__dirname, outputPDFLocation)
  return next()
};

fileController.sendDocumentList = async (req, res, next) => {
  console.log('sendDocuments middleware')
  const documentSendQuery = {
    // text: 'SELECT * FROM documents WHERE user_id = $1',
    // text: 'SELECT document_revisions.document_id, document_revisions.user_id, document_revisions.file_path, document_revisions.revision_number, document_revisions.revision_date, document_revisions.comments FROM "public"."document_revisions" WHERE user_id = $1',
    text: 'SELECT dr.document_id, dr.user_id, d.title, dr.revision_number, dr.file_path, dr.revision_date, dr.comments FROM documents d JOIN document_revisions dr ON dr.document_id = d.id JOIN users u ON u.id = dr.user_id WHERE u.id = $1 ORDER BY dr.revision_number DESC',
    values: [req.session.userID]
  };
  const sharedDocQuery = {
    // text: 'SELECT * FROM shared_documents JOIN documents ON documents.id = shared_documents.document_id WHERE shared_documents.shared_with_id = $1',
    text: 'SELECT d.id AS document_id, d.title, dr.revision_number, dr.file_path, dr.revision_date, dr.comments, sd.owner_id, shared_with_id FROM documents d JOIN shared_documents sd ON sd.document_id = d.id JOIN document_revisions dr ON dr.document_id = d.id WHERE sd.shared_with_id = $1 ORDER BY dr.revision_number DESC',
    values: [req.session.userID]
  }
  if (req.session.userID) {
    const ownDocumentSend = await db.query(documentSendQuery.text, documentSendQuery.values)
    res.locals.documentList = ownDocumentSend.rows

    const sharedDocumentSend = await db.query(sharedDocQuery.text, sharedDocQuery.values)
    res.locals.documentList = res.locals.documentList.concat(sharedDocumentSend.rows)
    return next()
  }
  res.locals.documentList = [];
  return next()
};

fileController.shareDocument = async (req, res, next) => {
  const { sharedUser } = req.body
  const params = [sharedUser]
  const findUser = await db.query('SELECT * FROM users WHERE email = $1', params)
  if (!findUser.rows[0]) {
    res.locals.userFound = false;
    res.locals.firstName = '';
    return next()
  }
  const shareDocumentQuery = {
    text: 'INSERT INTO shared_documents (document_id, owner_id, shared_with_id, owner_first_name, shared_first_name) VALUES ($1, $2, $3, $4, $5)',
    values: [req.body.docID, req.body.ownerID, findUser.rows[0].id, req.body.ownerFName, findUser.rows[0].first_name]
  };
  const shareDocument = await db.query(shareDocumentQuery.text, shareDocumentQuery.values)
  res.locals.userFound = true;
  res.locals.firstName = findUser.rows[0].first_name;
  return next()
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