import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chat = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log("chat name lsit", chats);
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date)
        .map((chat) => {
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="flex justify-between items-center cursor-pointer p-3 gap-3 hover:bg-yellow-800 hover:text-white"
          >
            <img
              className="w-12 h-12 rounded-full order-2"
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div>
              <span className="text-sm font-bold text-slate-950  order-1">
                {" "}
                {chat[1].userInfo.displayName}{" "}
              </span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>;
        })}
    </div>
  );
};

export default Chat;
