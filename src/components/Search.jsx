import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const hanldeSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && hanldeSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="border border-b-slate-800 ">
      <div className="p-3">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className=" bg-yellow-800 text-white rounded-md outline-none p-1"
        />
      </div>
      {/* <div className="flex items-center cursor-pointer p-3 gap-3 hover:bg-yellow-800 hover:text-white">
        <img
          className="w-12 h-12 rounded-full"
          src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_960_720.jpg"
          alt=""
        />
        <div>
          <span className="text-sm font-bold">Naimur</span>
        </div>
      </div> */}
      {error && <span>User not found!</span>}
      {user && (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            className="w-[50px] h-[50px] rounded-full object-fill"
            src={user.photoURL}
            alt=""
          />
          <div className="font-semibold">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
