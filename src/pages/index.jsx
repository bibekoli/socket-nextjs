import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initialize();

    return () => {
      socket.disconnect();
    }
  }, []);

  async function initialize() {
    await fetch("/api/socket");
    socket = io();

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("send-message", { name, message });
    setMessage("");
  }

  return (
    <div>
      <h1>NEXT SOCKET.IO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
      <hr />
      
      <h2>Messages</h2>
      <ul>
        {
          messages.map((msg, i) => (
            <li key={i}>
              <strong>{msg.name}</strong> : {msg.message}
            </li>
          ))
        }
      </ul>
    </div>
  );
};