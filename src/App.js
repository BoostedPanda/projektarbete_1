import { Route, Switch } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUser } from "./redux/userSlice"
import { Container } from "@mantine/core";
import Home from './pages/Home';
import Addcard from './pages/Addcard';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Container>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/addcard" render={(props) => <Addcard {...props} />} />
      </Switch>
    </Container>
  );
}

export default App;
