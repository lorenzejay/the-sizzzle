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
import EditUpload from "./pages/editUpload";
import SavedPosts from "./pages/savedPosts";
import UploadIngredientsAndDirections from "./pages/uploadIngredientsAndDirections";
import UploadDifficulty from "./components/uploadDifficultyAndCategory";
import UploadPreview from "./components/uploadPreview";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={SignIn} />
      <Route path="/dashboard/:id/edit-profile" component={EditProfilePage} />
      <Route exact path="/dashboard/:id" component={Dashboard} />
      <Route
        exact
        path="/upload-ingredients-directions"
        component={UploadIngredientsAndDirections}
      />
      <Route exact path="/upload-difficulty-category" component={UploadDifficulty} />
      <Route exact path="/upload-preview" component={UploadPreview} />
      <Route exact path="/upload" component={Upload} />

      <Route path="/post/:id" component={PostTemplate} />
      <Route exact path="/edit-post/:id" component={EditUpload} />
      <Route exact path="/saved" component={SavedPosts} />
    </Router>
  );
}

export default App;
