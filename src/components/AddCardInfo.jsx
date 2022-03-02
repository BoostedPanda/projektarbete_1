import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { GetCardType } from "./utils";

const currentYear = new Date().getFullYear();
const getTwodigitYear = parseInt(currentYear.toString().substring(2));
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? 0 + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => getTwodigitYear + i);


const AddCardInfo = ({ cardMonth, cardYear }) => {
  const dispatch = useDispatch();
  const { cardInformation } = useSelector((state) => state.userList);

  if (cardInformation.length === 0) {
    window.location.href = window.location.origin;
  }

  const cardData = {
    cardName: cardInformation[0].cardName,
    cardNumber: "#### #### #### ####",
    cardMonth: "MM",
    cardYear: "YY",
    ccv: "XXX",
    bankName: "",
    cardStateActive: false,
  };
  const [value, setValue] = useState(cardData);

  const testsend = () => {
    const cardInformation = {
      cardName: value.cardName,
      cardNumber: value.cardNumber,
      cardMonth: value.cardMonth,
      cardYear: value.cardYear,
      ccv: value.ccv,
      bankName: value.bankName,
      cardStateActive: false,
    };

    dispatch(addUser(cardInformation));
  };

  const testOnchange = (e) => {
    const nextCard = {
      ...value,
      [e.target.name]: e.target.value,
    };
    setValue(nextCard);
  };

  const handleBankChange = (e) => {
    const nextCard = {
      ...value,
      [e.target.name]: e.target.className,
    };
    setValue(nextCard);

    console.log(nextCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardInformation.length <= 3) {
      dispatch(addUser(value));
      setValue(cardData);
      console.log(cardInformation);
    } else {
      alert("Fullt i din E-wallet");
    }
  };

  const formatCC = (numbers) => {
    return String(numbers).replace(/\d{4}(?=.)/g, "$& ");
  };

  return (
    <div>
      <button onClick={() => {testsend();}}>Send user</button>
      <button onClick={() => {console.log(cardInformation);}}>Log user</button>
      <button onClick={() => {console.log();}}>Log state</button>

      <div id="cardplaceholder">
        <p id="cardNumber">Cardnumber: {formatCC(value.cardNumber)}</p>
        <p>Cardholder: {cardInformation[0].cardName}</p>
        <p id="month">Expiration Date: {value.cardMonth}/{value.cardYear}</p>
        <p id="cvc">ccv/cvc: {value.ccv}</p>
        <div id="bank">
          Selected bank: 
          <GetCardType type={value.bankName === "" ? undefined : value.bankName} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="inputbox">
          {/* fixa så det bara går att skriva nummer */}
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input type="number" maxLength="16" minLength="16" name="cardNumber" onChange={testOnchange} required/>
          </div>
          <div>
            <label htmlFor="cardName">Card Name</label>
            <input name="cardName" type="text" disabled value={cardInformation[0].cardName} required/>
          </div>

          <label htmlFor="cardMonth">Expiration Date</label>
          <select name="cardMonth" value={cardMonth} onChange={testOnchange} defaultValue={"hidden"} required>
            <option value="hidden" disabled hidden>
              Month
            </option>

            {monthsArr.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
          <select name="cardYear" value={cardYear} onChange={testOnchange} defaultValue={"hidden"} required>
            <option value="hidden" disabled hidden>
              Year
            </option>

            {yearsArr.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>

          <div>
            <label htmlFor="ccv">CCV/CVC</label>
            <input maxLength="3" minLength="3" name="ccv" type="number" onChange={testOnchange} required/>
          </div>

          <div>
            <p>Choose vendor:</p>
            <img onClick={handleBankChange} name="bankName" className="visa" src={require("../logos/visa.png")} alt="visa"/>
            <img onClick={handleBankChange} name="bankName" className="mastercard" src={require("../logos/mastercard.png")} alt="mastercard"/>
            <img onClick={handleBankChange} name="bankName" className="aExpress" src={require("../logos/aExpress.png")} alt="aExpress"/>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddCardInfo;
