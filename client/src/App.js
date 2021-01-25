import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//pages
import Homepage from "./pages/homepage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/dashboard/:id" component={Dashboard} />
    </Router>
  );
}

export default App;
