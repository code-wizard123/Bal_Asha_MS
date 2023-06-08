import React, { useEffect, useState } from "react";
import "./css/actionleft.css";
import child from "../../Images/ChildImage.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActionLeft = () => {
  const [childDetails, setChildDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getChildDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/groundWorker/childs/${id}`
        );
        const { child } = response.data;
        setChildDetails(child);
      } catch (error) {
        console.log("API request error:", error);
      }
    };

    getChildDetails();
  }, []);

  if (!childDetails) {
    return <div>Loading...</div>;
  }

  const { name, DateOfBirth, gender, actionLeft, keyCase, familyDetails } =
    childDetails;

  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(
      ageInMillis / (1000 * 60 * 60 * 24 * 365.25) // Assuming a year is 365.25 days
    );
    return ageInYears;
  };

  const sendChildDetailsEmail = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/sendEmail", {
        emailId: "manavshah.2003.ms@gmail.com", // Specify the email address to which you want to send the child details
        childDetails,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Email sending error:", error);
    }
  };

  return (
    <div>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            {actionLeft.map((action, index) => (
              <a href="#" key={index} onClick={sendChildDetailsEmail}>
                {/* Call sendChildDetailsEmail when clicked */}
                <li>{action}</li>
              </a>
            ))}
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <div className="profile">
        <img src={child} alt="Child Avatar" />
        <h2>{name}</h2>
        <p>
          <label>Age:</label> {calculateAge(DateOfBirth)} years
        </p>
        <p>
          <label>Gender:</label> {gender}
        </p>
        <p>
          <label>Family Details:</label> {familyDetails}
        </p>
        <p>
          <label>KeyCase:</label> {keyCase}
        </p>
      </div>
    </div>
  );
};


export default ActionLeft;
