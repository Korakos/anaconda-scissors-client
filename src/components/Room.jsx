import { useEffect, useState } from "react";

export default function Room({ socket }) {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    socket.on("user list", (data) => {
      console.log(data);
      setUsernames(data.users);
    });
    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, usernames]);

  return (
    <div>
      <ul>
        {usernames.map((arr) => {
            console.log(arr)
          return <li key={arr[0]}>{arr[1]}</li>;
        })}
      </ul>
    </div>
  );
}