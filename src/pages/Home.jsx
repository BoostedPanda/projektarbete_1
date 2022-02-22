import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {getUser} from "../redux/userSlice"
import {useEffect} from "react"
import AddCardInfo from '../components/AddCardInfo'

function Home() {
  const dispatch = useDispatch()
  const {cards, status, cardInformation} = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => {dispatch(getUser())}}>Getuser</button>
      <button onClick={() => {console.log(cards)}}>test</button>
      <button onClick={() => {console.log(cardInformation)}}>test2</button>
      <AddCardInfo/>
    </div>
  )
}

export default Home