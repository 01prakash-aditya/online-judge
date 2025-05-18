import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
    {/* header */}  
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route element = {<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}
