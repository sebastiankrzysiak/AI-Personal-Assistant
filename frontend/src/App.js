import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <h1 className="title">BASTIAN</h1>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <form
        className="chat-form"
        onSubmit={async (e) => {
          e.preventDefault();

          setMessage("");

          setMessages((prev) => [...prev, { sender: "user", text: message }]);

          try {
            const res = await fetch("/api/message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: message }),
            });

            const data = await res.json();

            setMessages((prev) => [
              ...prev,
              { sender: "bastian", text: data.output },
            ]);
          } catch (err) {
            console.log("Error:", err);
          }
        }}
      >
        <input
          id="chat-message"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
}

export default App;