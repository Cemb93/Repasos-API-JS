import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Characters from "./components/Characters";
import { Detail } from "./components/Detail";
import { New } from "./components/Create/New";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/characters"} component={Characters} />
          <Route exact path={"/characters/:id"} component={Detail} />
          <Route exact path={"/character/create"} component={New} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
