import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import visa from "../logos/visa.png"
import mastercard from "../logos/mastercard.png"
import aExpress from "../logos/americanexpress.png"


const currentYear = new Date().getFullYear();
const getTwodigitYear = parseInt( currentYear.toString().substring(2))
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? 0 + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => getTwodigitYear + i);


const AddCardInfo = ({ cardMonth, cardYear }) => {
  const dispatch = useDispatch()
  const { cardInformation } = useSelector((state) => state.userList)
  const cardData = {
    cardName: cardInformation[0].cardName,
    cardNumber: "#### #### #### ####",
    cardMonth: "MM",
    cardYear: "YY",
    ccv: "XXX",
    bankName: ""
  };
  const [value, setValue] = useState(cardData)

  const testsend = () => {
    const cardInformation =
    {
      cardName: value.cardName,
      cardNumber: value.cardNumber,
      cardMonth: value.cardMonth,
      cardYear: value.cardYear,
      ccv: value.ccv,
      bankName: value.bankName,
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

  }

  const handleBankChange = (e) => {
    const nextCard = {
      ...value,
      [e.target.name]: e.target.className
    };
    setValue(nextCard);

  }

  const formatCC = (numbers) => {
    return String(numbers).replace(/\d{4}(?=.)/g, '$& ')
  }
  
  formatCC(1234567890123456)



  return (
    <div>
      <button onClick={() => { testsend() }}>Send user</button>
      <button onClick={() => { console.log(cardInformation) }}>Log user</button>
      <button onClick={() => { console.log(value) }}>Log state</button>
      <div id='cardplaceholder'>

        <p id='cardNumber'>Cardnumber: {formatCC(value.cardNumber)}</p>
        <p>Cardholder: {cardInformation[0].cardName}</p>
        <p id='month'>Expiration Date: {value.cardMonth}/{value.cardYear}</p>
        <p id='cvc'>ccv/cvc: {value.ccv}</p>
       <p id='bank'>Selected bank: {value.bankName}</p>  {/* not permanent */}

      </div>
      <form>
        <div id='inputbox'>
          <div>
            <label htmlFor='cardNumber'>Card Number</label>
            <input maxLength="16" minLength="16" name='cardNumber' type="tel" onChange={testOnchange} required/>
          </div>
          <div>
            <label htmlFor='cardName'>Card Name</label>
            <input name='cardName' type="text" disabled value={cardInformation[0].cardName} required/>
          </div>


          <label htmlFor='cardMonth'>Expiration Date</label>
          <select name='cardMonth' value={cardMonth} onChange={testOnchange} required>
            <option value='' disabled selected hidden>Month</option>

            {monthsArr.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}

          </select>
          <select name='cardYear' value={cardYear} onChange={testOnchange} required>
            <option value='' disabled selected hidden>Year</option>

            {yearsArr.map((val, index) => (
              <option key={index} value={val}>{val}</option>
            ))}
          </select>


          <div>
            <label htmlFor='ccv'>CCV/CVC</label>
            <input maxLength="3" minLength="3" name='ccv' type="tel" onChange={testOnchange} required/>
          </div>  

          <div>
          <img onClick={handleBankChange} name="bankName" className="visa" src={visa} alt="visa"/>
          <img onClick={handleBankChange} name="bankName" className='mastercard' src={mastercard} alt="mastercard"/>
          <img onClick={handleBankChange} name="bankName" className="aExpress" src={aExpress} alt="aExpress"/>
          </div>
        </div>
      </form>

    </div>
  )
}

export default AddCardInfo