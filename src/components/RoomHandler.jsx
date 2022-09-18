import { useEffect, useState } from "react";

export default function RoomHandler({ socket, setActiveRoom }) {
  const [roomName, setRoomName] = useState("");
  const [roomNames, setRoomNames] = useState([]);

  const handleText = (e) => {
    const inputroomName = e.target.value;
    setRoomName(inputroomName);
  };

  const handleSubmit = () => {
    if (!roomName) {
      return;
    }
    socket.emit("create room", roomName);
    setRoomName("");
    setActiveRoom(roomName);
  };

  const handleJoinRoom = (room) => {
    socket.emit('join game', room);
    setActiveRoom(room)
  }

  useEffect(() => {
    socket.on("rooms", (data) => {
      setRoomNames(data.rooms);
    });
    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, roomNames]);

  return (
    <div>
      <h2>Create a room:</h2>
      <input type="text" value={roomName} onChange={handleText} />
      <button onClick={handleSubmit}>Create Room</button>
      {roomNames.map((arr) => {
        return (
          <div key={arr[0]}>
          <em>{arr[0]}</em>
          <button onClick={() => handleJoinRoom(arr[0])}>Join Room</button>
          </div>
        );
      })}
    </div>
  );
}