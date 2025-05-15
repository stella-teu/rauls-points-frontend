import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/apiConfig";
import { verifyUserProfile } from "../../services/authService";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [points, setPoints] = useState({});
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await verifyUserProfile();
        setProfile(profileData);
        setEditData({
          bio: profileData.bio,
          profile_pic: profileData.profile_pic,
          username: profileData.user.username,
        });
        // setSelectedFile(profileData.profile_pic)
        const res = await api.get(`/profiles/${profileData.id}/points`);
        setPoints(res.data);
      } catch (err) {
        console.error(err);
        navigate("/landing");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = async () => {
    setEditMode(!editMode);
    const profileData = await verifyUserProfile();
    setEditData({
      bio: profileData.bio,
      // profile_pic: profileData.profile_pic,
      username: profileData.user.username,
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append file only if selected
      if (selectedFile) {
        formData.append("profile_pic", selectedFile);
      }

      // Append the other fields
      formData.append("bio", editData.bio);
      formData.append("username", editData.username);

      const res = await api.patch(`/profiles/${profile.id}/`, formData);
      setProfile(res.data.profile);
      setEditData({
        ...editData,
        username: res.data,
      });

      setEditMode(false);
    } catch (error) {
      console.error("Failed to save changes", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await api.delete(`/profiles/${profile.id}/`);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  return (
    <div className="profile-container">
      {profile && (
        <div className="profile-card">
          {editMode ? (
            <>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={editData.username}
                onChange={handleInputChange}
              />
              <label>Bio:</label>
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleInputChange}
              />
              <label>Profile Picture:</label>
              <input
                type="file"
                name="profile_pic"
                // value={selectedFile}
                onChange={handleFileChange}
                placeholder="Image URL"
              />
              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleEditToggle}>Cancel</button>
                <button onClick={handleDeleteProfile}>Delete Profile</button>
              </div>
            </>
          ) : (
            <>
              <img
                src={`${profile.profile_pic}`}
                alt="Profile"
                className="profile-pic"
              />
              <h2>{profile.username}</h2>
              <p>{profile.bio}</p>
              <button onClick={handleEditToggle}>Edit Profile</button>
            </>
          )}
        </div>
      )}

      <section className="point-history">
        <h3>Point History</h3>
        {points.length > 0 ? (
          <ul>
            {points.map((point) => (
              <li key={point.id}>
                {point.value > 0 ? (
                  <strong>+{point.value} pts</strong>
                ) : (
                  <strong>{point.value} pts</strong>
                )}
                – {point.context || "No context"} <br />
                <small>{new Date(point.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No points yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
