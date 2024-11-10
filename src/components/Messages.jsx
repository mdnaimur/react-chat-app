import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (!data.chatId) {
      console.log("No chatId available; waiting for a chat selection.");
      return;
    }

    console.log("Current chatId:", data.chatId);

    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  console.log("I am inside message parent", messages);

  return (
    <div className=" bg-[#ddddf7] h-[659px] text-blue-950 overflow-scroll  p-3">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
