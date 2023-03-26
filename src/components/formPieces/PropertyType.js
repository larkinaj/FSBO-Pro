import React, { useState } from "react";


const PropertyType = (props) => {

  return (
    <div>
      <h1>Type Of Property</h1>
      <form>
        <input type="radio" id="singleFamily" name="propertyType" value="Single-Family Home" />
        <label for="singleFamily">Single-Family Home</label><br />
        <input type="radio" id="condominium" name="propertyType" value="Condominium" />
        <label for="condominium">Condominium</label><br />
        <input type="radio" id="plannedUnit" name="propertyType" value="Planned Unit Development (PUD)" />
        <label for="plannedUnit">Planned Unit Development (PUD)</label>
        <input type="radio" id="duplex" name="propertyType" value="Duplex (2-unit)" />
        <label for="duplex">Duplex (2-unit)</label>
      </form>
    </div>
  )
}

export default PropertyType