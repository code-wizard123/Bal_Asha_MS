import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/profile.css";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/admin/employee/647b663e2ad6798752d3086a");
        setProfileData(response.data.employee);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        {profileData && (
          <>
            <div className="profile-image">
              <img src={profileData.avatar.url} alt="Profile" />
            </div>
            <h2>{profileData.name}</h2>
            <p>Email: {profileData.email}</p>
            <p>Role: {profileData.role}</p>
            <p>Pincode: {profileData.pincode}</p>
            <p>Number of Children: {profileData.children.filter(Boolean).length}</p>
            {/* Other profile details */}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
