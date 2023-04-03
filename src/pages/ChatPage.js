import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "../components/Chat";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

function ChatPage() {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join room", room);
            setShowChat(true);
        }
    }

    return (
        <div>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join a Chat</h3>
                    <input
                        type="text"
                        placeholder="Name..."
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                        value={userName}
                    />
                    <input
                        type="text"
                        placeholder="Room Id..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                        value={room}
                    />
                    <button onClick={joinRoom}>Join a Room</button>
                </div>
            ) : (
                <Chat socket={socket} userName={userName} room={room} />
            )}
        </div>
    );
}

export default ChatPage;