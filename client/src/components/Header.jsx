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
          <li>
            <Link className="hover:text-blue-500" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/compiler">
              Compiler
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/problemset">
              ProblemSet
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/community">
              Community
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/contribute">
              Contribute
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500 flex items-center" to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture || 'https://tableconvert.com/images/avatar.png'}
                  alt="Profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                "Sign In"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}