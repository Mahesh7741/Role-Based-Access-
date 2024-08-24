import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import HomePage from "./components/Homepage";

function App() {
  return (
    <>
      <AppBar />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/homepage" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
