import { useEffect, useState } from "react";
import "./Landing.css";
import { getUsers } from "../../services/userService";

function Landing() {
    const [users, setUsers] = useState([])

    useEffect(() => {
      const fetchUsers = async() => {
        const usersData = await getUsers()
        console.log(usersData)
        setUsers(usersData)
      }
  
      fetchUsers()
    }, [])

  const podium = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <main className="leaderboard-container">
      <h1>🏆 Top 10 Leaderboard</h1>

      <div className="podium">
        {podium[1] && (
          <div className="podium-slot second">
            <img src={podium[1].profile_pic.replace(".jpeg", ".jpg") || "/default.jpg"} alt="2nd" />
            <p>{podium[1].user.username}</p>
            <span>{podium[1].total_points} pts</span>
          </div>
        )}
        {podium[0] && (
          <div className="podium-slot first">
            <img src={podium[0].profile_pic.replace(".jpeg", ".jpg") || "/default.jpg"} alt="1st" />
            <p>{podium[0].user.username}</p>
            <span>{podium[0].total_points} pts</span>
          </div>
        )}
        {podium[2] && (
          <div className="podium-slot third">
            <img src={podium[2].profile_pic.replace(".jpeg", ".jpg") || "/default.jpg"} alt="3rd" />
            <p>{podium[2].user.username}</p>
            <span>{podium[2].total_points} pts</span>
          </div>
        )}
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
          {rest.map((user, idx) => (
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
    </main>
  );
}

export default Landing;