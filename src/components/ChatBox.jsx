import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase";

const ChatBox = () => {
  const messagesEndRef = useRef();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);

  const daysOfWeekAz = ["Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə", "Bazar"];
  const monthsAz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];

  const groupMessagesByDay = () => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const createdAtDate = message.createdAt?.toDate();
      if (createdAtDate) {
        const dayOfWeek = daysOfWeekAz[createdAtDate.getDay()];
        const month = monthsAz[createdAtDate.getMonth()];
        const day = createdAtDate.getDate();
        const year = createdAtDate.getFullYear();
        const formattedDate = `${dayOfWeek} ${month} ${day} ${year}`;
        if (groupedMessages[formattedDate]) {
          groupedMessages[formattedDate].push(message);
        } else {
          groupedMessages[formattedDate] = [message];
        }
      }
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDay();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {Object.keys(groupedMessages).map((dayKey) => (
        <div key={dayKey}>
          <div className="text-center font-semibold my-2">{dayKey}</div>
          {groupedMessages[dayKey].map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
