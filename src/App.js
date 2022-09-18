import "./App.css";
import UsernameHandler from "./components/UsernameHandler";
import RoomHandler from "./components/RoomHandler";
import Room from "./components/Room";
import Game from "./components/Game";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [activeRoom, setActiveRoom] = useState("");

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("localhost:5001/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });

      setSocketInstance(socket);

      socket.on("connect", (data) => {
        console.log(data);
      });

      setLoading(false);

      socket.on("disconnect", (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  return (
    <div className="App">
      <h1>Rock Paper Scissors room lobbies!</h1>
      <small>
        So... I got carried away with defining the actual setup of the games
      </small>
      <div />
      {!buttonStatus ? (
        <button onClick={handleClick}>Connect to server</button>
      ) : (
        <>
          <button onClick={handleClick}>Disconnect from server</button>

          {!loading && (
            <div>
              <div className="line">
                <UsernameHandler
                  setAppUsername={setUsername}
                  socket={socketInstance}
                />
              </div>
              {username && (
                <div className="line">
                  <RoomHandler
                    setActiveRoom={setActiveRoom}
                    socket={socketInstance}
                  />
                </div>
              )}
              {activeRoom && (
                <div className="line">
                  <Room socket={socketInstance} />
                </div>
              )}
            </div>
          )}
        </>
      )}
      <Game />
    </div>
  );
}

export default App;
