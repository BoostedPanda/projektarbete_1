import React from "react";
import { Link } from "react-router-dom";
import ActiveCard from "../components/ActiveCard";

function Home() {
  return (
    <>
      <h2>Home</h2>
      <ActiveCard />
      <Link to="/addcard">
        <button>Add new card</button>
      </Link>
    </>
  );
}

export default Home;
