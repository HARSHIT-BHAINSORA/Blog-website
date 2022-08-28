import Topbar from "./components/topbar/Topbar";
import Home from "./components/pages/home/Home";
import Single from "./components/pages/single/Single";
import Write from "./components/write/Write";
import Settings from "./components/pages/settings/Settings";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";

function App() {
  const user = useContext(Context);
  console.log(user);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user == null ? <Home /> : <Register />}
        />
        <Route path="/login" element={user == null ? <Home /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
