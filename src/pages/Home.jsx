import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import ActiveCard from "../components/ActiveCard";

function Home() {
  const dispatch = useDispatch();
  const { cards, status, cardInformation } = useSelector(
    (state) => state.userList
  );

  return (
    <div>
      <h2>Home</h2>
      <ActiveCard />
      <div>
        <Link to="/addcard">
          <button>Add new card</button>
        </Link>
      </div>
      <button onClick={() => {dispatch(getUser());}}>Getuser</button>
      <button onClick={() => {console.log(cards);}}>test</button>
      <button onClick={() => {console.log(cardInformation);}}>test2</button>
    </div>
  );
}

export default Home;
