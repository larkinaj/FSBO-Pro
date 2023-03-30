import React, { useState, Component, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import OpenStreetMap from "./components/postings/openstreetmap";
import Mapbox  from "./components/postings/mapbox";
import NotFound from "./components/not-found";
import PurchaseAgreeFill from "./components/purchase-agreement-fill";
import LoginPage from "./components/login-signup/login"
import SignupPage from "./components/login-signup/signup";
import Profile from "./components/user/profile";
import Document from "./components/user/document";
import blankForm from "./components/helperFunctions/helper";
import './App.css';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState('pending');
  const [currentUser, setCurrentUser] = useState({firstName: '', userID: ''})
  const [userDocuments, setUserDocuments] = useState(['No Documents'])
  const [currentDocument, setCurrentDocument] = useState()
  const [formData, setFormData] = useState(blankForm)
  
  //   [
  //     {
  //       formName: 'Type Of Property',
  //       componentName: 'PropertyType',
  //       type: '',
  //       accessible: true,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Land',
  //       componentName: 'Land',
  //       land: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Property Address',
  //       componentName: 'PropertyAddress',
  //       propAddressLine1: '',
  //       propAddressLine2: '',
  //       propCity: '',
  //       propState: '',
  //       propZip: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Legal Description',
  //       componentName: 'LegalDescription',
  //       taxParcelInfo: '',
  //       otherLegalDescript: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Personal Property and Fixtures',
  //       componentName: 'PersonalProperty',
  //       propertyList: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     // {
  //     //   formName: 'Fixtures',
  //     //   componentName: 'Fixtures',
  //     //   description: '',
  //     //   accessible: false,
  //     //   requiredFieldsFilled: false,
  //     // },
  //     {
  //       formName: 'Other Information',
  //       componentName: 'OtherInformation',
  //       description: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'The Buyer',
  //       componentName: 'BuyerType',
  //       type: '',
  //       individuals: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Buyer (Individual)',
  //       componentName: 'BuyerIndividual',
  //       pdfIndex: 2,
  //       buyerFName: '',
  //       buyerLName: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Buyer (Business Entity Name)',
  //       componentName: 'BuyerEntity',
  //       entityName: '',
  //       signingFirstname: '',
  //       signingLastName: '',
  //       signingRole: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Buyer\'s Mailing Address',
  //       componentName: 'BuyerAddress',
  //       buyAddressLine1: '',
  //       buyAddressLine2: '',
  //       buyCity: '',
  //       buyState: '',
  //       buyZip: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'The Seller',
  //       componentName: 'SellerType',
  //       type: '',
  //       individuals: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Seller (Individual)',
  //       componentName: 'SellerIndividual',
  //       sellerFName: '',
  //       sellerLName: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Seller (Business Entity Name)',
  //       componentName: 'SellerEntity',
  //       entityName: '',
  //       signingFirstname: '',
  //       signingLastName: '',
  //       signingRole: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Seller\'s Mailing Address',
  //       componentName: 'SellerAddress',
  //       sellAddressLine1: '',
  //       sellAddressLine2: '',
  //       sellCity: '',
  //       sellState: '',
  //       sellZip: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Purchase Price',
  //       componentName: 'PurchasePrice',
  //       numericPrice: '',
  //       textPrice: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Earnest Money Deposit',
  //       componentName: 'EarnestDeposit',
  //       amount: '',
  //       payByDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Trust / Escrow Account',
  //       componentName: 'TrustEscrow',
  //       description: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Buyer Financing',
  //       componentName: 'BuyerFinancing',
  //       willBeContingent: '',
  //       typeOfFinancing: '', // Do not offer seller financing
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Cash Offer',
  //       componentName: 'CashOffer',
  //       proofByDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Standard Financing',
  //       componentName: 'StandardFinancing',
  //       proofRequired: '',
  //       proofByDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     // {
  //     //   formName: 'Seller Financing',
  //     //   componentName: 'SellerFinancing',
  //     //   description: '',
  //     //   accessible: false,
  //     //   requiredFieldsFilled: false,
  //     // },
  //     // {
  //     //   formName: 'Seller\'s Approval',
  //     //   componentName: 'SellerApproval',
  //     //   description: '',
  //     //   accessible: false,
  //     //   requiredFieldsFilled: false,
  //     // },
  //     {
  //       formName: 'Deed Type',
  //       componentName: 'DeedType',
  //       typeOfDeed: '', // Only offer warranty deed
  //       accessible: false, 
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Sale Of Another Property',
  //       componentName: 'SaleOfAnotherProperty',
  //       description: '',
  //       addressLine1: '',
  //       addressLine2: '',
  //       city: '',
  //       state: '',
  //       zipCode: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Date Required to be Sold',
  //       componentName: 'DateRequiredToSell',
  //       dateRequired: '',
  //       earnestMoneyReturn: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Closing Costs',
  //       componentName: 'ClosingCost',
  //       closingResponsibility: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'The Closing',
  //       componentName: 'ClosingDate',
  //       closingDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Mineral Right',
  //       componentName: 'MineralRights',
  //       sellerMineralRights: '',
  //       typeOfRights: '',
  //       specificRights: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Survey Problems',
  //       componentName: 'SurveyProblems',
  //       daysToRemediate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Title Search Report',
  //       componentName: 'TitleSearchReport',
  //       daysToReview: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Title Defects',
  //       componentName: 'TitleDefects',
  //       daysToRemediate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Inspections',
  //       componentName: 'Inspections',
  //       inspectionPeriod: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Defects',
  //       componentName: 'Defects',
  //       lastDayToReport: '',
  //       daysToRenegotiate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Appraisal',
  //       componentName: 'Appraisal',
  //       appraisalRequired: '',
  //       renegotiationPeriod: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Offer Expiration Date',
  //       componentName: 'OfferExpiration',
  //       expireDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Lead-Based Paint Disclosure',
  //       componentName: 'LeadDisclosure',
  //       builtBefore1978: '',
  //       brochureAgreement: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Required Disclosure',
  //       componentName: 'RequiredDisclosure',
  //       disclosureAgreement: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Attachments',
  //       componentName: 'Attachments',
  //       anyAttachments: '',
  //       nameOfAttachment: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Additional Terms & Conditions',
  //       componentName: 'AdditionalTerms',
  //       anyTerms: '',
  //       terms: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Real Estate Agents',
  //       componentName: 'RealEstateAgents',
  //       numberOfAgents: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Agent Names',
  //       componentName: 'AgentNames',
  //       firstName: '',
  //       lastName: '',
  //       company: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     },
  //     {
  //       formName: 'Effective Date',
  //       componentName: 'EffectiveDate',
  //       effectiveDate: '',
  //       accessible: false,
  //       requiredFieldsFilled: false,
  //     }
  //   ]
  // )
  
  useEffect(() => {
    fetch('http://localhost:3000/api/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('useEffect in App: ', data)
      if (data.session.authenticated) {
        setCurrentUser({firstName: data.session.firstName, userID: data.session.userID})
        setUserDocuments(data.documents)
        setIsAuthenticated(true)
      } else if (!data.session.authenticated) {
        setIsAuthenticated(false)
      }

    })
  }, [isAuthenticated])

  if (isAuthenticated === 'pending') {
    return (
      <div className="router">
        <h1>LOADING PAGE</h1>
      </div>
    )
  }
  else if (isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route
              exact path="/"
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route
              exact path="/profile"
              element={
                <Profile 
                  currentUser={currentUser}
                  userDocuments={userDocuments}
                  setUserDocuments={setUserDocuments}
                  setCurrentDocument={setCurrentDocument}
                  setFormData={setFormData}
                />
              }
            />
            <Route
              path="/profile/create"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="/profile/edit"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              exact path="/profile/documents/:id"
              element={
                <Document
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  userDocuments={userDocuments}
                  currentDocument={currentDocument}
                  setUserDocuments={setUserDocuments}
                  setCurrentDocument={setCurrentDocument}
                  setFormData={setFormData}
                  formData={formData}
                />
              }
            />
            <Route
              exact path="/open-street"
              element={<OpenStreetMap />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='/signup'
              element={
                <SignupPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route
              path="*"
              element={<NotFound />}
            />
            <Route
              path="/404"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }
  else if (!isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route 
              exact path='/'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='/signup'
              element={
                <SignupPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                  setUserDocuments={setUserDocuments}
                />
              }
            />
            <Route 
              exact path='*'
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }
}

export default App;
