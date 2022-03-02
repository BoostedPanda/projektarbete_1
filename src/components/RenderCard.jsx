import { useDispatch } from "react-redux";
import {removeUser, handleActive } from "../redux/userSlice"
import { GetCardType } from "./utils";

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
              return dispatch(removeUser(number))
            }
            return alert("Can't remove an active card!");
          }

        return (
          <section onClick={() => {dispatch(handleActive(creditCard.cardNumber))}} key={i}>
            <button onClick={() => {handleRemoveCard(creditCard.cardNumber)}}>DELETE</button>
            <p id="cardNumber">Cardnumber: {formatCC(creditCard.cardNumber)}</p>
            <p>Cardholder: {creditCard.cardName}</p>
            <p id="month">Expiration Date: {creditCard.cardMonth}/{creditCard.cardYear}</p>
            <p id="cvc">ccv/cvc: {creditCard.ccv}</p>
            <GetCardType type={creditCard.bankName} />
          </section>
        );
      })}

    </>
  );
};

export default RenderCard;
