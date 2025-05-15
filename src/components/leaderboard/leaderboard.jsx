import React, { useEffect } from 'react'
import { useState } from "react";
import { Link } from "react-router"
import { getUsers } from '../../services/userService';
import './leaderboard.css';

function Leaderboard() {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])
  const [selectedCohort, setSelectedCohort] = useState("")
  const [toggle, setToggle] = useState(false)

  const fetchUsers = async() => {
    const usersData = await getUsers(selectedCohort)

    const cohortSet = new Set();
    usersData.forEach(profile => {
      if (profile.cohort_name) {
        cohortSet.add(profile.cohort_name);
      }
    });

    const cohortArray = [...cohortSet];

    setUsers(usersData)
    setCohorts(cohortArray)
  }

  useEffect(() => {
    fetchUsers()
  }, [toggle])

  const handleChange = (e) => {
    setSelectedCohort(e.target.value)
    setToggle(prev => !prev)
  }

  return (
    <div className='leaderboard-page'>
      <h1>Leaderboard</h1>
      <div className="cohort-dropdown">
        <label htmlFor="cohort-btn">Select a Cohort</label>
        <select name="cohort-btn" id="cohort-btn" value={selectedCohort} onChange={handleChange}>
          <option value=""> -- All -- </option>
          {cohorts.map((cohortName, i) => (
            <option value={cohortName} key={i}>{cohortName}</option>
          ))}
        </select>

        {selectedCohort && <p>You selected cohort: {selectedCohort}</p>}
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
                <img className="avatar" src={user.profile_pic.replace(".jpeg", ".jpg") || "/default.jpg"} alt="profile" />
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
