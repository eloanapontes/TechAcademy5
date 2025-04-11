import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser";
import Options from "./pages/Options";
import NewDiet from "./pages/NewDiet";
import HistoricDiet from "./pages/HistoricDiet";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/NewDiet" element={<NewDiet />} />
        <Route path="/HistoricDiet" element={<HistoricDiet />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
