import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { SignUp } from "./components/signup/SignUp";
import { Login } from "./components/login/Login";
import { Home } from "./components/home/Home";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { PageNotFound } from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
