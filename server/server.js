const path = require('path');
const { PDFDocument, StandardFonts, rgb, nextLine } = require('pdf-lib');
const express = require('express');
const fs = require('fs')
const session = require('express-session')
require('dotenv').config()

const fileController = require('./controllers/fileController');
const sessionController = require('./controllers/sessionController')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 120000 },
  rolling: true
}))
app.use(express.static(path.resolve(__dirname, '../build')))

app.post("/login", sessionController.createSession, fileController.sendDocumentList, (req, res) => {
  const userData = {
    session: req.session,
    documents: res.locals.documentList
  }
  res.status(200).json(userData)
})

app.post("/api/signup", sessionController.createUser, sessionController.createSession, (req, res) => {
  const userData = {
    session: req.session,
    documents: res.locals.documentList
  }
  res.status(200).json(userData)
})

app.get("/api/verify", sessionController.verifyUser, fileController.sendDocumentList, (req, res) => {
  const userData = {
    session: req.session,
    documents: res.locals.documentList
  }
  res.status(200).json(userData)
})

app.post("/create", fileController.fillPDF, async (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  //res.download(res.locals.filePath)
  res.sendFile(res.locals.filePath)
})

app.post("/api/profile/send-document", (req, res) => {
  res.sendFile(path.join(__dirname, '/server/', req.body.path))
})

app.post("/api/profile/share-document", fileController.shareDocument, (req, res) => {
  res.status(200).json({userFound: res.locals.userFound, firstName: res.locals.firstName})
})

app.post("/api/profile/retrieve-document", fileController.retrievePDF, (req, res) => {
  res.status(200).json({revisions: res.locals.revisions})
})

app.post("/api/profile/save-edit", fileController.saveEdit, (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(res.locals.filePath)
})



app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});