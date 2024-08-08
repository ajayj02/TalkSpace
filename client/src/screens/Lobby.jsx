import { useCallback, useState } from "react";
import "../App.css";
import { useSocket } from "../context/SocketProvider";

function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(socket)
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  return (
    <div>
      Lobby
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room ID:</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join Room</button>
      </form>
    </div>
  );
}

export default Lobby;
