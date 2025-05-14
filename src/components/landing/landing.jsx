import { useEffect, useState } from "react";
import "./Landing.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Landing() {
  const [loading, setLoading] = useState(true);
  const [Users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/profiles/?leaderboard=true`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>{error}</p>;

  const podium = Users.slice(0, 3);
  const rest = Users.slice(3);

  return (
    <main className="leaderboard-container">
      <h1>🏆 Top 10 Leaderboard</h1>

      <div className="podium">
        {podium[1] && (
          <div className="podium-slot second">
            <img src={podium[1].profile_pic || "/default.jpg"} alt="2nd" />
            <p>{podium[1].user.username}</p>
            <span>{podium[1].total_points} pts</span>
          </div>
        )}
        {podium[0] && (
          <div className="podium-slot first">
            <img src={podium[0].profile_pic || "/default.jpg"} alt="1st" />
            <p>{podium[0].user.username}</p>
            <span>{podium[0].total_points} pts</span>
          </div>
        )}
        {podium[2] && (
          <div className="podium-slot third">
            <img src={podium[2].profile_pic || "/default.jpg"} alt="3rd" />
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
                <img className="avatar" src={user.profile_pic || "/default.jpg"} alt="profile" />
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