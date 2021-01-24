import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage";

import SignUp from "./pages/signUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
