import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const Login = () => {
  const [error, SetError] = useState(false);
  const navigate = useNavigate();

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      SetError(true);
    }
  };

  return (
    <div className=" min-h-[100vh] flex justify-center items-center p-4  bg-slate-600  ">
      <div className="flex flex-col items-center gap-3 bg-white rounded-lg py-8 px-16  shadow-lg">
        <span className="text-3xl font-bold text-yellow-400"> Chat App </span>
        <span className="text-2xl mb-10"> LogIn </span>
        <form className="flex flex-col gap-4 w-full" onSubmit={hanldeSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
          />

          <button className="w-full bg-yellow-500 p-3 rounded-lg font-bold hover:bg-yellow-700 transition">
            Sing In
          </button>
          {error && (
            <span className="text-red-600">User or password is incorrect</span>
          )}
        </form>
        <p className="w-full text-md">
          You don&apos;t have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
