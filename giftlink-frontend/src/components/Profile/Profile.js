
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [changed, setChanged] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { setUserName } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/app/login");
      return;
    }
    setFirstName(sessionStorage.getItem("firstName") || "");
    setLastName(sessionStorage.getItem("lastName") || "");
    setEmail(sessionStorage.getItem("email") || "");
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFirstName(sessionStorage.getItem("firstName") || "");
    setLastName(sessionStorage.getItem("lastName") || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken || !email) {
      navigate("/app/login");
      return;
    }
    try {
      const payload = { firstName, lastName };
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setUserName(firstName);
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("lastName", lastName);
        setChanged("Profile updated successfully!");
        setEditMode(false);
        setTimeout(() => {
          setChanged("");
        }, 1500);
      } else {
        setChanged("Failed to update profile.");
      }
    } catch (error) {
      setChanged("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} disabled className="form-control" />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-success mr-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Hi, {firstName} {lastName}</h1>
          <p><b>Email:</b> {email}</p>
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          <span style={{ color: 'green', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{changed}</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
