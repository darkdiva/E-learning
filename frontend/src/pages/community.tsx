import React, { useState, useEffect } from "react";
import axios from "axios";
import {User} from "../../../backend/src/models/User";
import NavBar from "../components/navbar";
import Side_bar from "../components/sidebar";

function Community() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios.get("/community").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar/>
      <Side_bar/>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.fullName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
