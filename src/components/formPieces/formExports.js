import React, { useState, useEffect } from "react";

const PropertyType = (props) => {
  const changePropType = (event) => {
    const newState = structuredClone(props.formData)
    newState[0].type = event.target.value
    document.getElementById(newState[0].type).checked = true;
    props.setFormData(newState)
  }
  // if (props.formData[0].type !== '') {
  //   document.getElementById(props.formData[0].type).checked = true;
  // }
  useEffect(() => {
    if (props.formData[0].type !== '') {
      document.getElementById(props.formData[0].type).checked = true;
    }
  })

  return (
    <div className='formContainer'>
      <h3>Type Of Property</h3>
      <form onChange={(e)=>changePropType(e)}>
        <input type="radio" id="singleFamily" name="propertyType" value="singleFamily" />
        <label for="singleFamily">Single-Family Home</label><br />
        <input type="radio" id="condominium" name="propertyType" value="condominium" />
        <label for="condominium">Condominium</label><br />
        <input type="radio" id="plannedUnit" name="propertyType" value="plannedUnit" />
        <label for="plannedUnit">Planned Unit Development (PUD)</label><br />
        <input type="radio" id="duplex" name="propertyType" value="duplex" />
        <label for="duplex">Duplex (2-unit)</label>
      </form>
    </div>
  )
}

const Land = (props) => {
  const changeLandType = (event) => {
    const newState = structuredClone(props.formData)
    newState[1].land = event.target.value
    document.getElementById(newState[1].land).checked = true;
    props.setFormData(newState)
  }
  useEffect(() => {
    if (props.formData[1].land !== '') {
      document.getElementById(props.formData[1].land).checked = true;
    } 
  })

  return (
    <div className='formContainer'>
      <h3>Land</h3>
      <span>Does The Property Include Land</span>
      <form onChange={(e)=>changeLandType(e)}>
        <input type="radio" id="yesLand" name="land" value="yesLand" />
        <label for="yesLand">Yes</label><br />
        <input type="radio" id="noLand" name="land" value="noLand" />
        <label for="noLand">No</label><br />
      </form>
    </div>
  )
}

const PropertyAddress = (props) => {
  const changeTextAddress = (event) => {
    const newState = structuredClone(props.formData)
    newState[2].propAddressLine1 = document.getElementById('propAddressLine1').value
    newState[2].propAddressLine2 = document.getElementById('propAddressLine2').value
    newState[2].propCity = document.getElementById('propCity').value
    newState[2].propState = document.getElementById('propState').value
    newState[2].propZip = document.getElementById('propZip').value
    props.setFormData(newState)
  }
  const changeState = (event) => {
    const newState = structuredClone(props.formData)
    newState[2].propAddressLine1 = document.getElementById('propAddressLine1').value
    newState[2].propAddressLine2 = document.getElementById('propAddressLine2').value
    newState[2].propCity = document.getElementById('propCity').value
    newState[2].propState = event.target.value
    newState[2].propZip = document.getElementById('propZip').value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('propAddressLine1').value = props.formData[2].propAddressLine1;
    document.getElementById('propAddressLine2').value = props.formData[2].propAddressLine2;
    document.getElementById('propCity').value = props.formData[2].propCity;
    document.getElementById('propState').value = props.formData[2].propState;
    document.getElementById('propZip').value = props.formData[2].propZip;
  });
  return (
    <div className='formContainer'>
      <h3>Property Address</h3>
      <span>Property's Street Address</span>
      <form>
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="propAddressLine1" name="propAddressLine2" />
        <label for="propAddressLine2">Street Address</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="propAddressLine2" name="propAddressLine2" />
        <label for="propAddressLine2">Address Line 2</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="propCity" name="propCity" />
        <label for="propCity">City</label><br />
        <select onChange={(e)=>changeState(e)} type="text" id="propState" name="propState">
          <option>Select A State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Missippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label for="propState">State</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="propZip" name="propZip" />
        <label for="propZip">Zip Code</label><br />
      </form>
    </div>
  )
}

const LegalDescription = (props) => {
  const changeLegalDesc = (event) => {
    const newState = structuredClone(props.formData)
    newState[3].taxParcelInfo = document.getElementById('taxParcelInfo').value
    newState[3].otherLegalDescript = document.getElementById('otherLegalDescript').value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('taxParcelInfo').value = props.formData[3].taxParcelInfo;
    document.getElementById('otherLegalDescript').value = props.formData[3].otherLegalDescript;
  });
  return (
    <div className='formContainer'>
      <h3>Legal Description</h3>
      <form>
        <div>
          {/* <span>Tax Parcel Information</span> */}
          <input onChange={(e)=>changeLegalDesc(e)} type="text" id="taxParcelInfo" name="taxParcelInfo" />
          <label for="taxParcelInfo">Tax Parcel Information</label><br />
        </div>
        <div>
          {/* <span>Other Description</span> */}
          <input onChange={(e)=>changeLegalDesc(e)} type="text" id="otherLegalDescript" name="otherLegalDescript" />
          <label for="otherLegalDescript">Other Description</label><br />
        </div>
      </form>
    </div>
  )
}

const PersonalProperty = (props) => {
  const changePersonalProp = (event) => {
    const newState = structuredClone(props.formData)
    newState[4].propertyList = document.getElementById('propertyList').value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('propertyList').value = props.formData[4].propertyList;
  });
  return (
    <div>
      <h3>Personal Property and Fixtures</h3>
      <form>
        <input onChange={(e)=>changePersonalProp(e)} type="text" id="propertyList" name="propertyList" />
        <label for="propertyList">List All Personal Property and Fixtures</label><br />
      </form>
    </div>
  )
}

const OtherInformation = (props) => {
  return (
    <div>
      <h3>Other Information</h3>
      <span>Is there any other information you would like to add about the Property?</span>
      <form>
        <input type="radio" id="yes" name="otherinfo" value="yes" />
        <label for="yes">Yes</label><br />
        <input type="radio" id="no" name="otherinfo" value="no" />
        <label for="no">No</label><br />
      </form>
    </div>
  )
}

const BuyerType = (props) => {
  const changeBuyerType = (event) => {
    const newState = structuredClone(props.formData)
    newState[6].type = event.target.value
    //document.getElementById(newState[6].type).checked = true;
    if (newState[6].type === 'individual') {
      document.getElementById("numOfIndivduals").disabled= false;
    }
    if (newState[6].type === 'entity') {
      document.getElementById("numOfIndivduals").disabled= true;
    }
    props.setFormData(newState)
  }
  const changeIndividuals = (event) => {
    const newState = structuredClone(props.formData)
    newState[6].individuals = event.target.value
    newState[6].type = 'individual'
    props.setFormData(newState)
  }
  useEffect(() => {
    if (props.formData[6].type !== '') {
      document.getElementById(props.formData[6].type).checked = true;
    } 
    if (props.formData[6].type === '' || props.formData[6].type === 'entity') {
      document.getElementById("numOfIndivduals").disabled= true;
    } 
    if (props.formData[6].individuals !== '') {
      let num = props.formData[6].individuals
      document.getElementById("individ" + num).selected= 'selected';
    }
  }, [props]);

  return (
    <div>
      <h3>The Buyer</h3>
      <span>Who is the buyer?</span>
      <form onChange={(e)=>changeBuyerType(e)}>
        <input type="radio" id="individual" name="buyer" value="individual" />
        <label for="individual">Individual(s)</label><br />
        <input type="radio" id="entity" name="buyer" value="entity" />
        <label for="entity">A Business Entity</label><br />
      </form>
      <div>
          <span>How many individuals?</span>
          <form onChange={(e)=>changeIndividuals(e)}>
            <select type="text" id="numOfIndivduals" name="numOfIndivduals">
              <option>Choose</option>
              <option id='individ1' value={1}>1</option>
              <option id='individ2' value={2}>2</option>
              <option id='individ3' value={3}>3</option>
              <option id='individ4' value={4}>4</option>
              <option id='individ5' value={5}>5</option>
            </select>
          </form>
        </div>
    </div>
  )
}

const BuyerIndividual = (props) => {
  const changeName = () => {
    const newState = structuredClone(props.formData)
    newState[7].buyerFName = document.getElementById('buyerFName').value;
    newState[7].buyerLName = document.getElementById('buyerLName').value;
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('buyerFName').value = props.formData[7].buyerFName;
    document.getElementById('buyerLName').value = props.formData[7].buyerLName;
  });

  // let numOfIndividuals = Number(props.formData[6].individuals)
  // let individuals = Array.from(Array(numOfIndividuals).keys())
  // individuals = individuals.map((el, i)=>{
  //   return (
  //     <div key={i}>
  //       <span>{i+1}. Individual Name</span>
  //       <form onChange={changeName}>
  //         <input type="text" id="buyerFName" name="buyerFName" />
  //         <label for="buyerFName">First Name</label><br />
  //         <input type="text" id="buyerLName" name="buyerLName" />
  //         <label for="buyerLName">Last Name</label><br />
  //       </form>
  //     </div>
  //   )
  // })

  return (
    <div>
      <h3>Buyer (Individual)</h3>
      <span>Individual Name</span>
      <form onChange={changeName}>
        <input type="text" id="buyerFName" name="buyerFName" />
        <label for="buyerFName">First Name</label><br />
        <input type="text" id="buyerLName" name="buyerLName" />
        <label for="buyerLName">Last Name</label><br />
      </form>
    </div>
  )
}

const BuyerEntity = (props) => {
  return (
    <div>
      <h3>Buyer (Business Entity Name)</h3>
      <form>
      <span>Business Entity's Name</span>
        <div>
          <input type="text" id="entityName" name="entityName" />
          {/* <label for="buyerFName">Busniess Entity's Name</label><br /> */}
        </div>
        <span>Who is signing on behalf of the Business Entity?</span>
        <div>
          <input type="text" id="entitySignerF" name="entitySignerF" />
          <label for="entitySignerF">First Name</label><br />
          <input type="text" id="entitySignerL" name="entitySignerL" />
          <label for="entitySignerL">Last Name</label><br />
        </div>
      </form>
      <span>Who is signing on behalf of the Business Entity?</span>
      <form>
        <input type="radio" id="president" name="entityChoice" value="president" />
        <label for="president">President</label><br />
        <input type="radio" id="ceo" name="entityChoice" value="ceo" />
        <label for="ceo">CEO</label><br />
        <input type="radio" id="member" name="entityChoice" value="member" />
        <label for="member">Member</label><br />
        <input type="radio" id="Officer" name="entityChoice" value="Officer" />
        <label for="Officer">Officer</label><br />
      </form>
    </div>
  )
}

const BuyerAddress = (props) => {
  const changeTextAddress = (event) => {
    const newState = structuredClone(props.formData)
    newState[9].buyAddressLine1 = document.getElementById('buyAddressLine1').value
    newState[9].buyAddressLine2 = document.getElementById('buyAddressLine2').value
    newState[9].buyCity = document.getElementById('buyCity').value
    newState[9].buyState = document.getElementById('buyState').value
    newState[9].buyZip = document.getElementById('buyZip').value
    props.setFormData(newState)
  }
  const changeState = (event) => {
    const newState = structuredClone(props.formData)
    newState[9].buyAddressLine1 = document.getElementById('buyAddressLine1').value
    newState[9].buyAddressLine2 = document.getElementById('buyAddressLine2').value
    newState[9].buyCity = document.getElementById('buyCity').value
    newState[9].buyState = event.target.value
    newState[9].buyZip = document.getElementById('buyZip').value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('buyAddressLine1').value = props.formData[9].buyAddressLine1;
    document.getElementById('buyAddressLine2').value = props.formData[9].buyAddressLine2;
    document.getElementById('buyCity').value = props.formData[9].buyCity;
    document.getElementById('buyState').value = props.formData[9].buyState;
    document.getElementById('buyZip').value = props.formData[9].buyZip;
  });
  return (
    <div>
      <h3>Buyer's Mailing Address</h3>
      <span>Buyer's Mailing Address</span>
      <form>
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="buyAddressLine1" name="buyAddressLine1" />
        <label for="buyAddressLine1">Street Address</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="buyAddressLine2" name="buyAddressLine2" />
        <label for="buyAddressLine2">Address Line 2</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="buyCity" name="buyCity" />
        <label for="buyCity">City</label><br />
        <select onChange={(e)=>changeState(e)} type="text" id="buyState" name="buyState">
          <option>Select A State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Missippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label for="buyState">State</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="buyZip" name="buyZip" />
        <label for="buyZip">Zip Code</label><br />
      </form>
    </div>
  )
}

const SellerType = (props) => {
  const changeSellerType = (event) => {
    const newState = structuredClone(props.formData)
    newState[10].type = event.target.value
    if (newState[10].type === 'individual') {
      document.getElementById("individual").checked = true;
      document.getElementById("numOfIndivduals").disabled= false;
    }
    if (newState[10].type === 'entity') {
      document.getElementById("entity").checked = true;
      document.getElementById("numOfIndivduals").disabled= true;
    }
    props.setFormData(newState)
  }
  const changeIndividuals = (event) => {
    const newState = structuredClone(props.formData)
    newState[10].individuals = event.target.value
    newState[10].type = 'individual'
    props.setFormData(newState)
  }
  useEffect(() => {
    if (props.formData[10].type !== '') {
      document.getElementById(props.formData[10].type).checked = true;
    } 
    if (props.formData[10].type === '' || props.formData[10].type === 'entity') {
      document.getElementById("numOfIndivduals").disabled= true;
    } 
    if (props.formData[10].individuals !== '') {
      let num = props.formData[10].individuals
      console.log(num)
      document.getElementById("individ" + num).selected= 'selected';
    }
  }, [props]);

  return (
    <div>
      <h3>The Seller</h3>
      <span>Who is the seller?</span>
      <form onChange={(e)=>changeSellerType(e)}>
        <input type="radio" id="individual" name="buyer" value="individual" />
        <label for="individual">Individual(s)</label><br />
        <input type="radio" id="entity" name="buyer" value="entity" />
        <label for="entity">A Business Entity</label><br />
      </form>
      <div>
          <span>How many individuals?</span>
          <form onChange={(e)=>changeIndividuals(e)}>
            <select type="text" id="numOfIndivduals" name="numOfIndivduals">
              <option>Choose</option>
              <option id='individ1' value={1}>1</option>
              <option id='individ2' value={2}>2</option>
              <option id='individ3' value={3}>3</option>
              <option id='individ4' value={4}>4</option>
              <option id='individ5' value={5}>5</option>
            </select>
          </form>
        </div>
    </div>
  )
}

const SellerIndividual = (props) => {
  const changeName = () => {
    const newState = structuredClone(props.formData)
    newState[11].sellerFName = document.getElementById('sellerFName').value;
    newState[11].sellerLName = document.getElementById('sellerLName').value;
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('sellerFName').value = props.formData[11].sellerFName;
    document.getElementById('sellerLName').value = props.formData[11].sellerLName;
  });
  // let numOfIndividuals = Number(props.formData[10].individuals)
  // let individuals = Array.from(Array(numOfIndividuals).keys())
  // individuals = individuals.map((el, i)=>{
  //   return (
  //     <div key={i}>
  //       <span>{i+1}. Individual Name</span>
  //       <form>
  //         <input type="text" id="sellerFName" name="sellerFName" />
  //         <label for="sellerFName">First Name</label><br />
  //         <input type="text" id="sellerLName" name="sellerLName" />
  //         <label for="sellerLName">Last Name</label><br />
  //       </form>
  //     </div>
  //   )
  // })
  return (
    <div>
      <h3>Seller (Individual)</h3>
      <span>Individual Name</span>
      <form onChange={changeName}>
        <input type="text" id="sellerFName" name="sellerFName" />
        <label for="sellerFName">First Name</label><br />
        <input type="text" id="sellerLName" name="sellerLName" />
        <label for="sellerLName">Last Name</label><br />
      </form>
    </div>
  )
}

const SellerEntity = (props) => {
  return (
    <div>
      <h3>Buyer (Seller Entity Name)</h3>
      <form>
      <span>Business Entity's Name</span>
        <div>
          <input type="text" id="entityName" name="entityName" />
          {/* <label for="buyerFName">Busniess Entity's Name</label><br /> */}
        </div>
        <span>Who is signing on behalf of the Business Entity?</span>
        <div>
          <input type="text" id="entitySignerF" name="entitySignerF" />
          <label for="entitySignerF">First Name</label><br />
          <input type="text" id="entitySignerL" name="entitySignerL" />
          <label for="entitySignerL">Last Name</label><br />
        </div>
      </form>
      <span>Who is signing on behalf of the Business Entity?</span>
      <form>
        <input type="radio" id="president" name="entityChoice" value="president" />
        <label for="president">President</label><br />
        <input type="radio" id="ceo" name="entityChoice" value="ceo" />
        <label for="ceo">CEO</label><br />
        <input type="radio" id="member" name="entityChoice" value="member" />
        <label for="member">Member</label><br />
        <input type="radio" id="Officer" name="entityChoice" value="Officer" />
        <label for="Officer">Officer</label><br />
      </form>
    </div>
  )
}

const SellerAddress = (props) => {
  const changeTextAddress = (event) => {
    const newState = structuredClone(props.formData)
    newState[13].sellAddressLine1 = document.getElementById('sellAddressLine1').value
    newState[13].sellAddressLine2 = document.getElementById('sellAddressLine2').value
    newState[13].sellCity = document.getElementById('sellCity').value
    newState[13].sellState = document.getElementById('sellState').value
    newState[13].sellZip = document.getElementById('sellZip').value
    props.setFormData(newState)
  }
  const changeState = (event) => {
    const newState = structuredClone(props.formData)
    newState[13].sellAddressLine1 = document.getElementById('sellAddressLine1').value
    newState[13].sellAddressLine2 = document.getElementById('sellAddressLine2').value
    newState[13].sellCity = document.getElementById('sellCity').value
    newState[13].sellState = event.target.value
    newState[13].sellZip = document.getElementById('sellZip').value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('sellAddressLine1').value = props.formData[13].sellAddressLine1;
    document.getElementById('sellAddressLine2').value = props.formData[13].sellAddressLine2;
    document.getElementById('sellCity').value = props.formData[13].sellCity;
    document.getElementById('sellState').value = props.formData[13].sellState;
    document.getElementById('sellZip').value = props.formData[13].sellZip;
  });
  return (
    <div>
      <h3>Seller's Mailing Address</h3>
      <span>Sellers's Mailing Address</span>
      <form>
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="sellAddressLine1" name="sellAddressLine1" />
        <label for="sellAddressLine1">Street Address</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="sellAddressLine2" name="sellAddressLine2" />
        <label for="sellAddressLine2">Address Line 2</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="sellCity" name="sellCity" />
        <label for="sellCity">City</label><br />
        <select onChange={(e)=>changeState(e)} type="text" id="sellState" name="sellState">
          <option>Select A State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Missippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label for="sellState">State</label><br />
        <input onChange={(e)=>changeTextAddress(e)} type="text" id="sellZip" name="sellZip" />
        <label for="sellZip">Zip Code</label><br />
      </form>
    </div>
  )
}

const PurchasePrice = (props) => {
  const changePrice = (event) => {
    const newState = structuredClone(props.formData)
    newState[14].numericPrice = Number(document.getElementById('numericPrice').value).toFixed(2);
    newState[14].textPrice = document.getElementById('textPrice').value;
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('numericPrice').value = props.formData[14].numericPrice;
    document.getElementById('textPrice').value = props.formData[14].textPrice;
  });
  return (
    <div>
      <h3>Purchase Price</h3>
      <form>
        <span>Numeric</span>
        <div>$
          <input onChange={(e)=>changePrice(e)} type="number" step=".01" id="numericPrice" name="numericPrice" />
        </div>
        <span>Text</span>
        <div>
          <input onChange={(e)=>changePrice(e)} type="text" id="textPrice" name="textPrice" />
          Dollars
        </div>
      </form>
    </div>
  )
}

const EarnestDeposit = (props) => {
  return (
    <div>
      <h3>Earnest Money Deposit</h3>
      <span>Will there be an Earnest Money Deposit?</span>
      <form>
        <input type="radio" id="earnestYes" name="earnestMoney" value="earnestYes" />
        <label for="earnestYes">Yes</label><br />
        <input type="radio" id="earnestNo" name="earnestMoney" value="earnestNo" />
        <label for="earnestNo">No</label><br />
      </form>
      <form>
        
      </form>
      <span>Enter the Amount ($)</span>
        <div>
          <input type="text" id="zipcode" name="zipcode" />
          Dollars
        </div>
    </div>
  )
}

const TrustEscrow = (props) => {

}

const BuyerFinancing = (props) => {

}

const CashOffer = (props) => {

}

const StandardFinancing = (props) => {

}
const DeedType = (props) => {

}
const SaleOfAnotherProperty = (props) => {

}
const DateRequiredToSell = (props) => {

}
const ClosingCost = (props) => {

}
const ClosingDate = (props) => {

}
const MineralRights = (props) => {

}
const SurveyProblems = (props) => {

}

const TitleSearchReport = (props) => {

}

const TitleDefects = (props) => {

}

const Inspections = (props) => {

}

const Defects = (props) => {

}

const Appraisal = (props) => {

}

const OfferExpiration = (props) => {

}

const LeadDisclosure = (props) => {

}

const RequiredDisclosure = (props) => {

}

const Attachments = (props) => {

}

const AdditionalTerms = (props) => {

}

const RealEstateAgents = (props) => {

}

const AgentNames = (props) => {

}

const EffectiveDate = (props) => {
  const changeDate = (event) => {
    const newState = structuredClone(props.formData)
    newState[39].effectiveDate = event.target.value
    props.setFormData(newState)
  }
  useEffect(() => {
    document.getElementById('effectiveDate').value = props.formData[39].effectiveDate
  })

  return (
    <div className='formContainer'>
      <h3>Effective Date</h3>
      <span>Effective Date Of This Agreement</span>
      <label for="effectiveDate">Start date:</label>
      <input onChange={(e)=>changeDate(e)} type="date" id="effectiveDate" name="effectiveDate" />
    </div>
  )
}

const formExports = {
  Land,
  PropertyType,
  PropertyAddress,
  LegalDescription,
  PersonalProperty,
  OtherInformation,
  BuyerType,
  BuyerIndividual,
  BuyerEntity,
  BuyerAddress,
  SellerType,
  SellerIndividual,
  SellerEntity,
  SellerAddress,
  PurchasePrice,
  EarnestDeposit,
  TrustEscrow,
  BuyerFinancing,
  CashOffer,
  StandardFinancing,
  DeedType,
  SaleOfAnotherProperty,
  DateRequiredToSell,
  ClosingCost,
  ClosingDate,
  MineralRights,
  SurveyProblems,
  TitleSearchReport,
  TitleDefects,
  Inspections,
  Defects,
  Appraisal,
  OfferExpiration,
  LeadDisclosure,
  RequiredDisclosure,
  Attachments,
  AdditionalTerms,
  RealEstateAgents,
  AgentNames,
  EffectiveDate,
}
export default formExports