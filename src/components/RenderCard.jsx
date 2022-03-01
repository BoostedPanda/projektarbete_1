import visa from "../logos/visa.png";
import mastercard from "../logos/mastercard.png";
import aExpress from "../logos/americanexpress.png";
import { useDispatch, useSelector } from "react-redux";
import {removeUser, handleActive } from "../redux/userSlice"


const formatCC = (numbers) => {
  return String(numbers).replace(/\d{4}(?=.)/g, "$& ");
};

const RenderCard = ({ card }) => {
  const dispatch = useDispatch()

  return (
    <>
      {card.map((creditCard, i) => {

          const handleRemoveCard = (number) => {
            if(!creditCard.cardStateActive) {
              dispatch(removeUser(number))
            } else {
              alert("Can't remove an active card!");
            }

          }

        return (
          <>
          <button onClick={() => {console.log(creditCard)}}>Log</button>
            <button onClick={() => {handleRemoveCard(creditCard.cardNumber)}}>DELETE</button>
            <button onClick={() => {dispatch(handleActive(creditCard.cardNumber))}}>Change</button>
  
            <p id="cardNumber">Cardnumber: {formatCC(creditCard.cardNumber)}</p>
            <p>Cardholder: {creditCard.cardName}</p>
            <p id="month">Expiration Date: {creditCard.cardMonth}/{creditCard.cardYear}</p>
            <p id="cvc">ccv/cvc: {creditCard.ccv}</p>
            { creditCard.bankName === "visa" ? (<img name="bankName" className="visa" src={visa} alt="visa" />) 
            : creditCard.bankName === "mastercard" ? (<img name="bankName" className="mastercard" src={mastercard} alt="mastercard"/>) 
            : creditCard.bankName === "aExpress" ? (<img name="bankName" className="aExpress" src={aExpress} alt="aExpress"/>) 
            : null}
          </>
        );
      })}

    </>
  );
};

export default RenderCard;
