import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, userName, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    const renderedMessageList = messageList.map((messageContent, index) => {
        return (
            <div key={index} className="message" id={userName === messageContent.author ? "you" : "other"}>
                <div className="message-content">
                    <p>{messageContent.message}</p>
                </div>
                <br />
                <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                </div>
            </div>
        );
    })

    useEffect(() => {
        socket.on("receive message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {renderedMessageList}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Type message"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}
                    onKeyDown={(event) => {
                        event.key === 'Enter' && sendMessage()
                    }}
                    value={currentMessage}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;