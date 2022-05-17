import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ActivityList from "./features/Activities/Dashboard/ActivityList";
import ActivityForm from "./features/Activities/Form/ActivityForm";
import NotFound from "./features/errors/NotFound";
import LoginForm from "./features/users/LoginForm";
import RegisterForm from "./features/users/RegisterForm";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<ActivityList />}></Route>
          <Route path={"/create"} element={<ActivityForm />}></Route>
          <Route path={"/edit/:id"} element={<ActivityForm />} />
          <Route path={"/login"} element={<LoginForm />} />
          <Route path={"/register"} element={<RegisterForm />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
