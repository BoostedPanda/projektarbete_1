import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import visa from "../logos/visa.png"
import mastercard from "../logos/mastercard.png"
import aExpress from "../logos/americanexpress.png"

function ActiveCard() {
  const { cardInformation } = useSelector((state) => state.userList)

  const activeCard = cardInformation.filter(value => {
    return (
      value.cardStateActive === true
    )
  })
    
  return (
    <div>
      <h3>Active card!</h3>
      <p id='cardNumber'>Cardnumber: {activeCard[0].cardNumber}</p>
      <p>Cardholder: {activeCard[0].cardName}</p>
      <p id='month'>Expiration Date: {activeCard[0].cardMonth}/{activeCard[0].cardYear}</p>
      <p id='cvc'>ccv/cvc: {activeCard[0].ccv}</p>
      <div> {/* Optimize this potato code */}
        {activeCard[0].bankName === "visa" && <img name="bankName" className="visa" src={visa} alt="visa"/>}
        {activeCard[0].bankName === "mastercard" && <img name="bankName" className='mastercard' src={mastercard} alt="mastercard"/>}
        {activeCard[0].bankName === "aExpress" && <img name="bankName" className="aExpress" src={aExpress} alt="aExpress"/>}
      </div>
    </div>
  )
}

export default ActiveCard