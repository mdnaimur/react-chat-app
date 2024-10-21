import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Add from "../img/addAvatar.png";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      console.log(storageRef);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-[100vh] flex justify-center items-center p-4  bg-slate-600  ">
      <div className="flex flex-col items-center gap-3 bg-white rounded-lg py-8 px-16  shadow-lg">
        <span className="text-3xl font-bold text-yellow-400"> Chat App </span>
        <span className="text-2xl mb-10"> Register </span>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name "
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
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
          <input type="file" id="file" className="hidden" />
          <label
            htmlFor="file"
            className="flex items-start  gap-3 text-gray-400 text-md cursor-pointer"
          >
            <img src={Add} alt="Image" className="w-8" />
            <span>Add an avatar</span>
          </label>
          <button className="w-full bg-yellow-500 p-3 rounded-lg font-bold hover:bg-yellow-700 transition">
            Sing Up
          </button>
          {loading && "Uploading and compressing the image please wait..."}
          {error && <span>Something went wrong</span>}
        </form>
        <p className="w-full p-3 border border-gray-300 rounded-md">
          You do have an account?
          {/* <Link to="/">Login</Link> */}
        </p>
      </div>
    </div>
  );
};

export default Register;
