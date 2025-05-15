import React, { useEffect } from 'react'
<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router"
import { getUsers } from "../../services/userServise";
=======
import { useState, useNavigate } from "react";
import { Link } from "react-router"
import { getUsers } from '../../services/userService';
>>>>>>> ed94d938ac65f3acef7ed7eacf7a95b8531d2945

function Leaderboard() {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async() => {
      const usersData = await getUsers()
      setUsers(usersData)
    }

    fetchUsers()
  }, [])

  return (
    <div className='leaderboard-page'>
      <h1>Leaderboard</h1>
      <div className="cohort-dropdown">
        <button className='Cohort'></button>
      </div>
      <div className="leaderboard-container">
        <ol>
        {users.length && users.map((user) => (
          <div key={user.id} className="user-card">
            <li>
              <Link to={`/profiles/${user.id}`}>
              </Link>
              <h2>{user.user.username}</h2>
              <p>{user.total_points}</p>
              </li>
            </div>
        ))}
        </ol>
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default Leaderboard
=======
export default Leaderboard
>>>>>>> ed94d938ac65f3acef7ed7eacf7a95b8531d2945
