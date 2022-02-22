import './App.css';
import {Route, Switch} from "react-router-dom"
import Home from './pages/Home';
import Addcard from './pages/Addcard';
import {useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {getUser} from "./redux/userSlice"


function App() {
  const dispatch = useDispatch()
  const {cards, status, cardInformation} = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
 
    <div className="App">
      <header className="App-header">
        <h2>Projekt Arbete PogU</h2>
        <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/addcard" render={(props) => <Addcard {...props} />} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
