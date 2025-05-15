import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";

export default function App() {
  return (
    <BrowserRouter>
    {/* header */}  
    <Header/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/sign-in" element={<h1>SignIn</h1>} />
        <Route path="/sign-up" element={<h1>SignUp</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
