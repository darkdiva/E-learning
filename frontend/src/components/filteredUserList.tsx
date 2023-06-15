import { useParams } from "react-router-dom";
import axios from "axios";
import {User} from "../../../backend/src/models/User";
import { useState, useEffect } from "react";

interface Props{
  role: string;
}


function FilteredUsersList(props: Props) {
  const { role } = props;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`api/admin/community/${role}`).then((res) => {
      setUsers(res.data);
    });
  }, [role]);

  return (
    <div>
      <h2>List of {role}s:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName} {user.lastName} {user.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilteredUsersList;
