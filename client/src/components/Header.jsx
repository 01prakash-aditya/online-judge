import { Link } from "react-router-dom";
import logo from "/src/assets/logo.png"; 
import { useSelector } from "react-redux";

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h1 className="font-bold text-lg">AlgoU Online Judge</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/compiler">
            <li>Compiler</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.profilePicture || 'https://tableconvert.com/images/avatar.png'} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
              ):(
                <li>Sign In</li>
              )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
