import React from 'react'
import AddCardInfo from '../components/AddCardInfo'
import {Link} from "react-router-dom"

function Addcard() {

  return (
    <div>AddCard
      <div>
        <Link to="/">
        <button>Go back!</button>
        </Link>
      </div>
            <AddCardInfo/>
    </div>
    
  )
}

export default Addcard