import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { db, storage } from "../firebase";

import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Attach from "../img/attach.png";
import Img from "../img/img.png";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="flex h-12 bg-white text-black items-center justify-between p-3">
      <input
        className="outline-none border-none text-sm"
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="flex items-center gap-2">
        <img className="h-6 cursor-pointer" src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img className="h-6 cursor-pointer" src={Img} alt="Upload" />
        </label>

        <button
          className="bg-[#8da4f1] py-2 px-3 border-none cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;

/***
 * 
 * 
 * 
 * 
 *  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data?.chatId) {
      console.warn("No chatId available; cannot send message.");
      return;
    }

    if (!text.trim() && !img) {
      console.warn("No message text or image to send.");
      return;
    }

    let imageUrl = null;

    if (img) {
      try {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload failed:", error);
          },
          async () => {
            try {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              await sendMessage(imageUrl);
            } catch (error) {
              console.error("Error retrieving download URL:", error);
            }
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await sendMessage();
    }

    setText("");
    setImg(null);
  };

  const sendMessage = async (imageUrl = null) => {
    const chatDocRef = doc(db, "chats", data.chatId);
    const userChatCurrentRef = doc(db, "userChats", currentUser.uid);
    const userChatOtherRef = doc(db, "userChats", data.user?.uid);

    try {
      // Using setDoc with merge option to create document if it doesn't exist
      await setDoc(
        chatDocRef,
        {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: imageUrl,
          }),
        },
        { merge: true }
      );

      const lastMessageData = {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      };

      if (userChatCurrentRef) {
        await setDoc(userChatCurrentRef, lastMessageData, { merge: true });
      }

      if (userChatOtherRef) {
        await setDoc(userChatOtherRef, lastMessageData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating message data:", error);
    }
  };
 * 
 * **** */
