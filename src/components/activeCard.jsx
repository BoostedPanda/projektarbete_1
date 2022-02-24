import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RenderCard from "./RenderCard";

function ActiveCard() {
  const { cardInformation } = useSelector((state) => state.userList);
  const [state, setState] = useState(cardInformation);

  const activeCard = cardInformation.filter((value) => {
    return value.cardStateActive === true;
  });

  const inactiveCards = cardInformation.filter((state) => {
    return state.cardStateActive !== true;
  });

  const allCards = [...activeCard, ...inactiveCards];

  // console.log("alla", allCards);
  // console.log("active", activeCard);
  // console.log("inactive", inactiveCards);


  return (
    <div>
      <h3>Active card!</h3>
      <RenderCard card={activeCard} />
      <div>
        <h2>Inactive cards!</h2>
        {console.log(inactiveCards)}
        <RenderCard card={inactiveCards} />
      </div>
    </div>
  );
}

export default ActiveCard;
