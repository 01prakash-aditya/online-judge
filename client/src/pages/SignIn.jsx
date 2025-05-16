import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
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

    const res = await fetch("/api/auth/signin",{
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
    navigate("/");

  } catch (err) {
    setLoading(false);
    setError(true);
  }
};
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
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
        <button disabled={loading} className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-55 ">
          {loading ? 'Loading...' : 'Sign In' }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{ error && "Something went wrong!"}</p>
    </div>
  );
}
