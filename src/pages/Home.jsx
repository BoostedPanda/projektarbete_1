import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {getUser} from "../redux/userSlice"
import {useEffect} from "react"

function Home() {
  const dispatch = useDispatch()
  const {user, status} = useSelector((state) => state.userList)
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  console.log(status);

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => {dispatch(getUser())}}>Getuser</button>
        {status && user.results.map((user) => {
          console.log(user.name);
        })}
    </div>
  )
}

export default Home