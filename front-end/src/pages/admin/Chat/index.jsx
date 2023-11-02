import { useEffect, useRef, useState } from 'react';
import './chatStaff.scss'
import { emit, on } from '../../../services/SocketService';
import { SOCKET } from '../../../const';
import { formatTimestamp, scrollToBottom } from '../../../helper';
import { useSelector } from 'react-redux';

const ChatStaff = () => {
    const chatContainerRef = useRef(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(null);
    const account = useSelector(state => state.account);
    useEffect(() => {
        setUsername(account?.username);
        emit(SOCKET.getRoomList, null, (rooms) => {
            setRooms(rooms);
        });
    }, [])

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        emit(SOCKET.staffJoinRoom, room._id);
        emit(SOCKET.getChatHistory, room._id, (messages) => {
            setMessages(messages);
        });
    };



    useEffect(() => {
        scrollToBottom(chatContainerRef);
    }, [selectedRoom, messages])

    const handleSendMessage = () => {
        if (selectedRoom && message && username) {
            emit(SOCKET.chatMessage, { roomId: selectedRoom._id, username: username, message: message });
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
        <div className="messenger">
            <div className="sidebar">
                <div className="header">Danh sách phòng chat</div>
                <ul className="room-list">
                    {rooms.map((room, index) => (
                        <li key={index} className="room-item" onClick={() => handleRoomClick(room)}>
                            <div className="room-details">
                                <div className="room-name">{room.name}</div>
                                <div className="last-message">{room.latestMessage.text}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-area">
                <div className="room-header">
                    {selectedRoom && <h3 className="center-text">{selectedRoom.name}</h3>}
                </div>
                <div className="message-container" ref={chatContainerRef}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender === username ? "staff-message": "user-message" }`}
                        >
                            <span> {message.content} </span> 
                            <div className="timestamp">{formatTimestamp(message.timestamp)}</div>
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault(); 
                              handleSendMessage();
                            }
                          }}
                    />
                    <button onClick={handleSendMessage}>Gửi</button>
                </div>
            </div>
        </div>
    );
};

export default ChatStaff;
