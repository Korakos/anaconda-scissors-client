import { useState } from "react";

export default function UsernameHandler({ socket, setAppUsername }) {
  const [username, setUsername] = useState("");
  const [acceptedUsername, setAcceptedUsername] = useState('');

  const handleText = (e) => {
    const inputusername = e.target.value;
    setUsername(inputusername);
  };

  const handleSubmit = () => {
    if (!username) {
      return;
    }
    setAcceptedUsername(username);
    socket.emit("set name", username);
    setAppUsername(username);
  };

  return (
    <div>
      {acceptedUsername?<h2>Welcome {acceptedUsername}!</h2>:<h2>Set Username!</h2>
}
      <input type="text" value={username} onChange={handleText} />
      <button onClick={handleSubmit}>set username</button>
    </div>
  );
}