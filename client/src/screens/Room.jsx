import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { ReactPlayer } from "react-player";
import "../App.css";

function Room() {
  const [remoteSocket, setRemoteSocket] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const socket = useSocket();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} has joined the room`);
    setRemoteSocket(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div className="room">
      <h1>Room 1</h1>
      <h4>{remoteSocket ? "connected" : "no one in the room"}</h4>
      {remoteSocket && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <>
        <h3>My Stream</h3>
        <ReactPlayer
          playing={true}
          muted={true}
          height="100px"
          width="200px"
          url={myStream}
        />
        </>
      )}
    </div>
  );
}

export default Room;
