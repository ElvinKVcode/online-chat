import { UserAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = UserAuth();

  return (
    <div>
      <div className={`chat ${message.uid === currentUser?.uid ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={message.avatar} />
          </div>
        </div>
        <div className="chat-header">
          {message.name}
        </div>
        <div className="chat-bubble chat-bubble-success text-gray-100">{message.text}</div>
        <div className="chat-footer">
          <time className="text-xs opacity-50 px-2">{new Date(message.createdAt?.toDate()).toLocaleTimeString()}</time>
        </div>
      </div>
    </div>
  );
};

export default Message;
