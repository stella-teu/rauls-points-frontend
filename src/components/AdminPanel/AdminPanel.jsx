import React, { useEffect, useState } from "react";
import { getAllUsers, givePointsToUser } from "../../services/adminService";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [points, setPoints] = useState("");
  const [context, setContext] = useState({});

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleContextChange = (userId, value) => {
    setContext({ ...context, [userId]: value });
  };

  const handleAwardPoints = async (userId) => {
    await givePointsToUser(userId, {
      value: points[userId],
      context: context[userId] || "",
    });

    setPoints({ ...points, [userId]: "" });
    setContext({ ...context, [userId]: "" });
    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <input
        type="text"
        placeholder="Search by username"
        value={search}
        onChange={handleSearchChange}
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="admin-page-user-card">
            <h2>{user.user.username}</h2>
            <p>Total Points: {user.total_points}</p>

            <input
              type="number"
              placeholder="Points"
              value={points[user.id] || ""}
              onChange={(e) =>
                setPoints({ ...points, [user.id]: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Context (optional)"
              value={context[user.id] || ""}
              onChange={(e) => handleContextChange(user.id, e.target.value)}
            />

            <button onClick={() => handleAwardPoints(user.id)}>
              Award Points
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;