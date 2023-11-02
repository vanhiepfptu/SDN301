import { io } from "socket.io-client";
import store from './../redux/store';

let socket = null; // Tạo biến socket và đặt ban đầu là null

export const connectToSocket = () => {
  // Lấy AccessToken từ Redux Store
  const accessToken = store.getState().account.accessToken;

  if (accessToken) {
    socket = io("localhost:3000", {
      pingTimeout: 24 * 60 * 60 * 1000,
      pingInterval: 10000,
      auth: { token: accessToken }
    });

    socket.on("connect", () => {
        console.log(socket.auth);
    });
    socket.on("connect_error", (err) => {
        console.log(err instanceof Error); 
        console.log(err.message); 
        console.log(err.data); 
      });

  } else {
    console.log('AccessToken không tồn tại. Đảm bảo người dùng đã đăng nhập trước khi kết nối tới socket.');
  }
};

export const on = (eventName, callback) => {
    if(socket)
    socket.on(eventName, (data) => {
        callback(data);
    });
}

export const emit = (eventName, data, callback) => {
    if(socket)
    socket.emit(eventName, data, callback);
}


export default socket;