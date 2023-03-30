import React, { useState, useEffect } from "react";
import formExports from "./formPieces/formExports";


const PurchaseAgreeFill = (props) => {
  const [formData, setFormData] = useState(
    [
      {
        formName: 'Type Of Property',
        componentName: 'PropertyType',
        type: '',
        accessible: true,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Land',
        componentName: 'Land',
        land: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Property Address',
        componentName: 'PropertyAddress',
        propAddressLine1: '',
        propAddressLine2: '',
        propCity: '',
        propState: '',
        propZip: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Legal Description',
        componentName: 'LegalDescription',
        taxParcelInfo: '',
        otherLegalDescript: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Personal Property and Fixtures',
        componentName: 'PersonalProperty',
        propertyList: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      // {
      //   formName: 'Fixtures',
      //   componentName: 'Fixtures',
      //   description: '',
      //   accessible: false,
      //   requiredFieldsFilled: false,
      // },
      {
        formName: 'Other Information',
        componentName: 'OtherInformation',
        description: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'The Buyer',
        componentName: 'BuyerType',
        type: '',
        individuals: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Buyer (Individual)',
        componentName: 'BuyerIndividual',
        pdfIndex: 2,
        buyerFName: '',
        buyerLName: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Buyer (Business Entity Name)',
        componentName: 'BuyerEntity',
        entityName: '',
        signingFirstname: '',
        signingLastName: '',
        signingRole: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Buyer\'s Mailing Address',
        componentName: 'BuyerAddress',
        buyAddressLine1: '',
        buyAddressLine2: '',
        buyCity: '',
        buyState: '',
        buyZip: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'The Seller',
        componentName: 'SellerType',
        type: '',
        individuals: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Seller (Individual)',
        componentName: 'SellerIndividual',
        sellerFName: '',
        sellerLName: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Seller (Business Entity Name)',
        componentName: 'SellerEntity',
        entityName: '',
        signingFirstname: '',
        signingLastName: '',
        signingRole: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Seller\'s Mailing Address',
        componentName: 'SellerAddress',
        sellAddressLine1: '',
        sellAddressLine2: '',
        sellCity: '',
        sellState: '',
        sellZip: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Purchase Price',
        componentName: 'PurchasePrice',
        numericPrice: '',
        textPrice: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Earnest Money Deposit',
        componentName: 'EarnestDeposit',
        amount: '',
        payByDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Trust / Escrow Account',
        componentName: 'TrustEscrow',
        description: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Buyer Financing',
        componentName: 'BuyerFinancing',
        willBeContingent: '',
        typeOfFinancing: '', // Do not offer seller financing
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Cash Offer',
        componentName: 'CashOffer',
        proofByDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Standard Financing',
        componentName: 'StandardFinancing',
        proofRequired: '',
        proofByDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      // {
      //   formName: 'Seller Financing',
      //   componentName: 'SellerFinancing',
      //   description: '',
      //   accessible: false,
      //   requiredFieldsFilled: false,
      // },
      // {
      //   formName: 'Seller\'s Approval',
      //   componentName: 'SellerApproval',
      //   description: '',
      //   accessible: false,
      //   requiredFieldsFilled: false,
      // },
      {
        formName: 'Deed Type',
        componentName: 'DeedType',
        typeOfDeed: '', // Only offer warranty deed
        accessible: false, 
        requiredFieldsFilled: false,
      },
      {
        formName: 'Sale Of Another Property',
        componentName: 'SaleOfAnotherProperty',
        description: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Date Required to be Sold',
        componentName: 'DateRequiredToSell',
        dateRequired: '',
        earnestMoneyReturn: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Closing Costs',
        componentName: 'ClosingCost',
        closingResponsibility: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'The Closing',
        componentName: 'ClosingDate',
        closingDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Mineral Right',
        componentName: 'MineralRights',
        sellerMineralRights: '',
        typeOfRights: '',
        specificRights: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Survey Problems',
        componentName: 'SurveyProblems',
        daysToRemediate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Title Search Report',
        componentName: 'TitleSearchReport',
        daysToReview: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Title Defects',
        componentName: 'TitleDefects',
        daysToRemediate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Inspections',
        componentName: 'Inspections',
        inspectionPeriod: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Defects',
        componentName: 'Defects',
        lastDayToReport: '',
        daysToRenegotiate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Appraisal',
        componentName: 'Appraisal',
        appraisalRequired: '',
        renegotiationPeriod: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Offer Expiration Date',
        componentName: 'OfferExpiration',
        expireDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Lead-Based Paint Disclosure',
        componentName: 'LeadDisclosure',
        builtBefore1978: '',
        brochureAgreement: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Required Disclosure',
        componentName: 'RequiredDisclosure',
        disclosureAgreement: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Attachments',
        componentName: 'Attachments',
        anyAttachments: '',
        nameOfAttachment: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Additional Terms & Conditions',
        componentName: 'AdditionalTerms',
        anyTerms: '',
        terms: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Real Estate Agents',
        componentName: 'RealEstateAgents',
        numberOfAgents: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Agent Names',
        componentName: 'AgentNames',
        firstName: '',
        lastName: '',
        company: '',
        accessible: false,
        requiredFieldsFilled: false,
      },
      {
        formName: 'Effective Date',
        componentName: 'EffectiveDate',
        effectiveDate: '',
        accessible: false,
        requiredFieldsFilled: false,
      }
    ]
  )
  console.log('original state ', formData)
  const [currentForm, setCurrentForm] = useState(
    <formExports.PropertyType formData={formData} setFormData={setFormData} />
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
    let nextComponent = formData[formIndex].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData, setFormData, key: formIndex}))
    setPreviousButton(formIndex - 1)
    setNextButton(formIndex + 1)
  }

  const previousForm = (event) => {
    let nextComponent = formData[previousButton].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData, setFormData}))
    setPreviousButton(previousButton - 1)
    setNextButton(nextButton - 1)
  }

  const nextForm = (event) => {
    let nextComponent = formData[nextButton].componentName
    setCurrentForm(React.createElement(formExports[nextComponent], {formData, setFormData, key: nextButton}))
    setPreviousButton(previousButton + 1)
    setNextButton(nextButton + 1)
  }

  const createPDF = async () => {
    const copyOfFormData = structuredClone(formData)
    copyOfFormData.push(props.currentUser)
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

  const listItmes = structuredClone(formData).map((el, i)=>{
    return (
      <li key={i} id={i} onClick={(e)=>navigateForm(e)}>{el.formName}</li>
    )
  })


  return (
    <div>
      <h1>Virginia Residential Purchase and Sale Agreement</h1>
      <div>
        {currentForm}
        <button onClick={previousForm}>Previous Page</button>
        <button onClick={nextForm}>Continue</button>
        <button onClick={createPDF}>Create PDF</button>
      </div>
      <div>
        <ol>
          {listItmes}
        </ol>
      </div>
    </div>
  )
}

export default PurchaseAgreeFill;