import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"

const AddCardInfo = (props) => {
  const dispatch = useDispatch()
  const { cardInformation } = useSelector((state) => state.userList)
  const cardData = {
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    ccv: "",
    bankName: ""
  };
  const [value, setValue] = useState(cardData)



  const testsend = () => {
   const cardInformation = 
      {
        cardName: "",
        cardNumber: "1234567891011121",
        cardMonth: "12",
        cardYear: "21",
        ccv: "111",
        bankName: "Visa",
        cardStateActive: false
      }
    
    dispatch(addUser(cardInformation))
  }
  


  const testOnchange = (e) => {
    const nextCard = {
      ...value,
      [e.target.name]: e.target.value
    };
    setValue(nextCard);
    // document.querySelector(`${id}`).innerHTML = value
    
  }

  return (
    <div>
      <h1>Add card</h1>
      <button onClick={() => {testsend()}}>Send user</button>
      <button onClick={() => {console.log(cardInformation)}}>Log user</button>
      <div id='cardplaceholder'>
        <p id='cardNumber'>Cardnumber: {value.cardNumber}</p>
        <p>Cardholder: {cardInformation[0].cardName}</p>
        <p id='month'>MM/YY</p>
        <p id='cvc'>ccv/cvc</p>

      </div>
<form>
        <div id='inputbox'>
        <div>
            <label htmlFor='cardNumber'>Card Number</label>
            <input maxLength="16" name='cardNumber' type="text" onChange={testOnchange}/>
        </div>
        <div>
            <label htmlFor='cardName'>Card Name</label>
            <input name='cardName' type="text" disabled placeholder={cardInformation[0].cardName}/>
        </div>
          <select name='cardMonth' >
            <option disabled>Month</option>
          </select>
          <input type="text" />
        <div>
            <label htmlFor='ccv'>CCV/CVC</label>
            <input maxLength="3" name='ccv' type="text" />
        </div>
        </div>
</form>

    </div>
  )
}

export default AddCardInfo