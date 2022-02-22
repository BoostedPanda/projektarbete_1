import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"

const AddCardInfo = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userList)

  const testsend = () => {
   const cardInformation = 
      {
        cardName: "",
        cardNumber: "1234567891011121",
        cardMonth: "12",
        cardYear: "21",
        ccv: "111",
        bankName: "Visa",
        cardStateActive: false
      }
    
    dispatch(addUser(cardInformation))
  }



  return (
    <div>
      <h1>Add card</h1>

      <button onClick={() => {testsend()}}>Log user</button>
    </div>
  )
}

export default AddCardInfo