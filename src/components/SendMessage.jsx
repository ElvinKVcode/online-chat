import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Please enter a message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid: uid 
      });
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-400 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none input-bordered input-accent" type="text" />
        <button type="submit" className="w-auto bg-green-600 text-white rounded-r-lg px-5 text-sm">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
