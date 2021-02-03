import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//pages
import Homepage from "./pages/homepage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import EditProfilePage from "./pages/editProfilePage";
import Upload from "./pages/upload";
import PostTemplate from "./pages/postTemplate";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={SignIn} />
      <Route exact path="/:id" component={Dashboard} />
      <Route path="/:id/edit-profile" component={EditProfilePage} />
      <Route path="/upload" component={Upload} />
      <Route path="/post/:id" component={PostTemplate} />
    </Router>
  );
}

export default App;
