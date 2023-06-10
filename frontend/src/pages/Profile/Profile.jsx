import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./css/profile.css";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return "Case Manager";
      case 2:
        return "Operation Manager";
      case 3:
        return "Ground Level Worker";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/employee/647b663e2ad6798752d3086a"
        );
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the case counts for each month
  const caseCounts = profileData.casesClosed.reduce((counts, entry) => {
    const { month, count } = entry;
    counts[month] = count;
    return counts;
  }, {});

  // Create an array of data for the line chart
  const chartData = months.map((month) => ({
    month,
    count: caseCounts[month] || 0,
  }));

  return (
    <div className="stats-profile">
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-details">
          {profileData && (
            <>
              <div className="profile-image">
                <img src={profileData.avatar.url} alt="Profile" />
              </div>
              <h2>{profileData.name}</h2>
              <div className="chart-container">
                <LineChart width={500} height={300} data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="grey" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="rgba(75, 192, 192, 1)"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
              <p>Email: {profileData.email}</p>
              <p>Role: {getRoleName(profileData.role)}</p>
              <p>Pincode: {profileData.pincode}</p>
              <p>
                Number of Children assigned: {profileData.children.filter(Boolean).length}
              </p>
              {/* Other profile details */}
              <button>
                <Link to="/TopPerformerDetails">Find Out the top Performer of the current Month</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
