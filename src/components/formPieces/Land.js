import React, { useState } from "react";


const Land = (props) => {

  return (
    <div>
      <h1>Does The Property Include Land</h1>
      <form>
        <input type="radio" id="yes" name="land" value="yes" />
        <label for="yes">Yes</label><br />
        <input type="radio" id="no" name="land" value="no" />
        <label for="no">No</label><br />
      </form>
    </div>
  )
}

export default Land