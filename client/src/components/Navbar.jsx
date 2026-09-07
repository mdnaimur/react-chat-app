import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between text-white bg-yellow-900 p-3 h-14 rounded-sm">
      <span className="text-md font-bold "> Chat App </span>
      <div className="flex gap-2 mr-4">
        <img
          src={currentUser.photoURL}
          alt=""
          className="w-6 h-6 bg-slate-200 rounded-full cursor-pointer hover:bg-transparent"
        />
        <span className="capitalize">{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-slate-400 p-1 rounded-md text-black cursor-pointer hover:bg-yellow-400 text-sm  font-bold capitalize"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
