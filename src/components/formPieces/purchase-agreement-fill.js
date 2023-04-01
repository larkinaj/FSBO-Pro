import React, { useState, useEffect } from "react";
import formExports from "./formExports";
import { useLocation } from 'react-router-dom';
import './purchase-agreement-fill.css'

const PurchaseAgreeFill = (props) => {
  const location = useLocation();
  console.log('original state ', props.formData)
  const [currentForm, setCurrentForm] = useState(
    <formExports.PropertyType formData={props.formData} setFormData={props.setFormData} />
  )
  const [previousButton, setPreviousButton] = useState(-1)
  const [nextButton, setNextButton] = useState(1)

  useEffect(() => {
    console.log('useEffect in Purchase-Agreement')
    fetch('http://localhost:3000/api/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('Here is purchase-agreement component')
      if (data.authenticated === false) {
        props.setIsAuthenticated(false)
      }
      console.log(data)
    })
  })

  const handleClick = async () => {
    // fetch('http://localhost:3000/data')
    // .then(res => {
    //   console.log(res)
    //   return res.blob()
    // })
    // .then(blob => {
    //   // const pdfDoc = await PDFDocument.load(fs.readFileSync(vaResPurchaseAgreement))  
    //   // const pdfBytes = await test.save()
    //   const fileURL = window.URL.createObjectURL(blob);
    //   console.log('fileURL: ', fileURL)
    //   window.open(fileURL);
    //   // Setting various property values
    //   // let alink = document.createElement('a');
    //   // alink.href = fileURL;
    //   // alink.download = 'SamplePDF.pdf';
    //   // alink.click();
    //   // (C2) CLEAN UP
    //   window.URL.revokeObjectURL(fileURL);
    //   // document.removeChild(alink);
    // })
    // .catch((err) => console.error(err))
  }

  const navigateForm = (event) => {
    let formIndex = Number(event.target.id)
    let nextComponent = props.formData[formIndex].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData: props.formData, setFormData: props.setFormData, key: formIndex}))
    setPreviousButton(formIndex - 1)
    setNextButton(formIndex + 1)
  }

  const previousForm = (event) => {
    let nextComponent = props.formData[previousButton].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData: props.formData, setFormData: props.setFormData}))
    setPreviousButton(previousButton - 1)
    setNextButton(nextButton - 1)
  }

  const nextForm = (event) => {
    let nextComponent = props.formData[nextButton].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData: props.formData, setFormData: props.setFormData, key: nextButton}))
    setPreviousButton(previousButton + 1)
    setNextButton(nextButton + 1)
  }

  const createPDF = async (event) => {
    const copyOfFormData = structuredClone(props.formData)
    console.log(copyOfFormData)
    if (copyOfFormData.length === 41) {
      copyOfFormData[40].comments = document.getElementById('submissionCommment').value
      fetch('http://localhost:3000/api/profile/save-edit', {
      method: 'POST',
      body: JSON.stringify(copyOfFormData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.blob())
    .then(blob => {
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL);
      window.URL.revokeObjectURL(fileURL);
    })
    .catch((err) => console.error(err))
    }

    if (copyOfFormData.length === 40) {
      copyOfFormData.push(props.currentUser)
      copyOfFormData[40].comments = document.getElementById('submissionCommment').value
      if (document.getElementById('submissionCommment').value === '') copyOfFormData[40].comments = 'Initial version'
      fetch('http://localhost:3000/create', {
        method: 'POST',
        body: JSON.stringify(copyOfFormData),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.blob())
      .then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL);
        window.URL.revokeObjectURL(fileURL);
      })
      .catch((err) => console.error(err))
    }
  }

  const listItmes = structuredClone(props.formData).map((el, i)=>{
    if (i !== 40) {
      return (
        <li key={i} id={i} className="formListItems" onClick={(e)=>navigateForm(e)}>{el.formName}</li>
      )
    }
  })

  return (
    <div>
      <h1>Virginia Residential Purchase and Sale Agreement</h1>
      <div className="formDiv">
        <div>
          <ol>
            {listItmes}
          </ol>
        </div>
        <div className="currentForm">
          <div>
            {currentForm}
            <button className="navigateFormButton" onClick={previousForm}>Previous Page</button>
            <button className="navigateFormButton" onClick={nextForm}>Continue</button>
          </div>
          <div className="formSubmissionDiv">
            <div className="commentSubmitDiv">
              <textarea type="text" id="submissionCommment" name="submissionCommment" />
              <button className="submitFormButton" onClick={createPDF}>Save and Submit</button>
              {/* <form onSubmit={createPDF}>
                <input type="text" id="submissionCommment" name="submissionCommment" /><br />
                <label for="submissionCommment">Submission Comments</label>
                <input type="submit" value="Save and Submit"></input>
              </form> */}
            </div>
            <span className="commentsSpan">Submission Comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseAgreeFill;