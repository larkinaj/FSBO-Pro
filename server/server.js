const path = require('path');
const { PDFDocument, StandardFonts, rgb, nextLine } = require('pdf-lib');
const express = require('express');
const fs = require('fs')
const session = require('express-session')

const fileController = require('./controllers/controller');
const sessionController = require('./controllers/sessionController')
const templatePDFLocation = "./pdf-files/VA-Residential-Purchase-Agreement.pdf";
const outputPDFLocation = './pdf-files/example.pdf'


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 60000 },
  rolling: true
}))
app.use(express.static(path.resolve(__dirname, '../build')))

app.post("/login", sessionController.createSession, (req, res) => {
  res.status(200).json({ authenticated: true, session: req.session })
})

app.get("/verify", sessionController.verifyUser, (req, res) => {
  res.status(200).json({ authenticated: true, session: req.session })
})

app.post("/create", fileController.fillPDF, async (req, res) => {
  let folder = ''
  res.setHeader('Content-Type', 'application/pdf');
  //res.download(path.join(__dirname, templatePDFLocation))
  res.sendFile(path.join(__dirname, outputPDFLocation))
})

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});