import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth.jsx";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    const data = await res.json();
    setLoading(false);
    if(data.success === false){
      setError(true);
      return;
    }
    navigate("/sign-in");
  } catch (err) {
    setLoading(false);
    setError(true);
  }
};
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <label htmlFor="username" className="text-sm text-gray-500">
          Username :
        </label>
        <input
          type="text"
          placeholder="eg. aditya07"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="email" className="text-sm text-gray-500">
          Email :
        </label>
        <input
          type="email"
          placeholder="eg. abc@yahoo.com"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-sm text-gray-500">
          Password :
        </label>
        <input
          type="password"
          placeholder="Create a secure password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="fullName" className="text-sm text-gray-500">
          Full Name :
        </label>
        <input
          type="text"
          placeholder="eg. Aditya Prakash"
          id="fullName"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="dob" className="text-sm text-gray-500">
          Date of Birth :
        </label>
        <input
          type="date"
          placeholder="Date Of Birth"
          id="dob"
          className="bg-slate-100 text-gray-500 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-55 ">
          {loading ? 'Loading...' : 'Sign Up' }
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{ error && "Something went wrong!"}</p>
    </div>
  );
}
