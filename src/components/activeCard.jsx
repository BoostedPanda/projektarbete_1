import { useSelector } from "react-redux";
import RenderCard from "./RenderCard";

function ActiveCard() {
  const { cardInformation } = useSelector((state) => state.userList);

  const activeCard = cardInformation.filter((value) => {
    return value.cardStateActive === true;
  });

  const inactiveCards = cardInformation.filter((state) => {
    return state.cardStateActive !== true;
  });

  return (
    <div>
      <h3>Active card!</h3>
      <RenderCard card={activeCard} />
      <div>
        <h2>Inactive cards!</h2>
        <RenderCard card={inactiveCards} />
      </div>
    </div>
  );
}

export default ActiveCard;
