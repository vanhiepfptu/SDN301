import React, { useState, useEffect, useRef } from 'react';
import icons from "../../../services/IconService";
import { emit, on } from "../../../services/SocketService";
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET } from '../../../const';
import { Link } from 'react-router-dom';
import { formatTimestamp, scrollToBottom } from '../../../helper';

const Chat = () => {
  const chatBoxRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState(null);
  const account = useSelector(state => state.account);
  
  useEffect(() => {
    if (!account.username) return;
    // console.log(socket.user);
    setUsername(account?.username);
    joinRoom(account?.username);
  }, []);

  useEffect(() => {
    emit(SOCKET.getChatHistory, room, (messages) =>{
      setMessages(messages);
    });
  }, [room]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    scrollToBottom(chatBoxRef);
  }, [room, messages, isChatOpen]);


  const joinRoom = (username) => {
    emit(SOCKET.joinRoom, username, (createRoom) => {
      console.log(createRoom);
      setRoom(createRoom);
    });
  };

  const sendMessage = () => {
    console.log(message, room, username);
    if (message && room && username) {
      emit(SOCKET.chatMessage, { roomId: room, username: username, message: message });
      setMessage('');
    }
  };
  
  useEffect(() => {
    on(SOCKET.chatMessage, (msg) => {
      console.log(msg);
      setMessages([...messages, msg]);
    });
  }, [messages]);

  return (
    <div className="chat">
      {!isChatOpen && (
        <div className="chat-logo-container" onClick={toggleChat}>
          <div className="chat-logo">
            <icons.chat className="chat-logo" />
            <span className="chat-logo-text">
              <span>C</span>
              <span>h</span>
              <span>a</span>
              <span>t</span>
            </span>
          </div>
        </div>
      )}
      {isChatOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Chat với chúng tôi</h3>
            <button className="close-button" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {Object.keys(account).length === 0 ? (
              <div className="chat-login-form">
                <p>Nếu bạn muốn chat với nhân viên, vui lòng đăng nhập hoặc đăng ký</p>
                <Link to="/login">
                  <button>Đăng nhập</button>
                </Link>
                <Link to="/signUp">
                  <button>Đăng ký</button>
                </Link>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${ msg.sender === username ? "user-message" : "staff-message"  }`}
                >
                  {msg.content}
                  <div className="timestamp">{formatTimestamp(msg.timestamp)}</div>
                </div>
              ))
            )}
          </div>
          {Object.keys(account).length !== 0 && (
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Ngăn chặn việc xuống dòng trong input
                    sendMessage();
                  }
                }}
              />
              <button className="send-button" onClick={sendMessage}>
                Gửi
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Chat;
