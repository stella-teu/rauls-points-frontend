import React, { useEffect } from 'react'
import { useState } from "react";
import { Link } from "react-router"
import { getUsers } from '../../services/userService';

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
       <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Profile</th>
            <th>Username</th>
            <th>Points</th>
            <th>Cohort</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 4}</td>
              <td>
                <img className="avatar" src={user.profile_pic || "/default.jpg"} alt="profile" />
              </td>
              <td>{user.user.username}</td>
              <td>{user.total_points}</td>
              <td>{user.cohort_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="leaderboard-container">
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
      </div> */}
    </div>
  )
}

export default Leaderboard
