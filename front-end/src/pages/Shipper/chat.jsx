// import React from 'react';
// import './Shipper.scss'; // Import CSS file



// const Chat = () => {
//   return (
//     <div className="container-fluid shipper-container">
//     {/* Sidebar */}
//     <div className="sidebar">
//       <div className="sidebar-icon">
//       <a href="/shipping">Home</a><br></br>
//           <a href="/shipping/chat">Chat</a><br></br>
//       </div>
//     </div>

  
   
//   </div>
    

//   );
// };

// export default Chat;
import React, { useState } from 'react';
import './Shipper.scss'; // Import CSS file

const Chat = () => {
  const users = ['User 1', 'User 2', 'User 3']; // Danh sách người dùng
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setChatMessages([]); // Xóa tin nhắn khi chuyển người dùng
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { user: 'Shipper', text: message };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
    }
  };

  return (
        <div className="container-fluid shipper-container">
 
  
      {/* Sidebar */}
      <div className="sidebar">
      <div className="sidebar-icon">
      <a href="/shipping">Home</a><br></br>
          <a href="/shipping/chat">Chat</a><br></br>
      </div>
    </div>

      <div className="chat-sidebar">
        <h3 className="sidebar-header">Users</h3>
        <ul className="sidebar-users">
          {users.map((user) => (
            <li
              key={user}
              className={`user-item ${user === selectedUser ? 'active' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat window */}
      <div className="chat-window">
        <div className="user-chat">
          {selectedUser && (
            <h3>{selectedUser}</h3>
          )}
          <ul className="chat-messages">
            {chatMessages.map((message, index) => (
              <li
                key={index}
                className={message.user === 'Shipper' ? 'shipper' : 'user'}
              >
                {message.text}
              </li>
            ))}
          </ul>
          <div className="input-box">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
