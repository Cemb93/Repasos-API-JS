import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Characters from "./components/Characters";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/characters"} component={Characters} />
          <Route exact path={"/characters/:id"} component={Characters} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
