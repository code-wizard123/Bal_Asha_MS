import React, { useEffect, useState } from "react";
import "./css/actionleft.css";
import child from "../../Images/ChildImage.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionLeft = () => {
  const [childDetails, setChildDetails] = useState();
  const [actionLeft, setActionLeft] = useState([]);
  const notify = () => toast("Email Sent Successfully");

  useEffect(() => {
    const getChildDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7"
        );
        const { child } = response.data;
        setChildDetails(child);
        setActionLeft(child.actionLeft); // Set the actionLeft array
        console.log(child);
      } catch (error) {
        console.log("API request error:", error);
      }
    };

    getChildDetails();
  }, []);

  const deleteEntry = (index) => {
    const updatedActionLeft = [...actionLeft];
    updatedActionLeft.splice(index, 1);
    setActionLeft(updatedActionLeft);
  };

  if (!childDetails) {
    return <div>Loading...</div>;
  }

  const { name, DateOfBirth, gender, keyCase, familyDetails } = childDetails;

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
      const data = {
        emailId: "manavshah.2003.ms@gmail.com",
        childDetails: [childDetails], // Wrap childDetails in an array
      };

      await axios.post("http://localhost:4000/api/v1/sendEmail", data);
      console.log("Email sent successfully");
      notify();
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
              <a
                href="#"
                key={index}
                onClick={() => {
                  sendChildDetailsEmail();
                  notify();
                  deleteEntry(index); // Call deleteEntry function on click
                }}
              >
                <li>{action}</li>
              </a>
            ))}
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <div class="animate">
      <div className="bubbles">
      <span id="r"></span>
      <span id="a"></span>
      <span id="b"></span>
      <span id="n"></span>
      <span id="o"></span>
      <span id="p"></span>
      <span id="s"></span>
      <span id="v"></span>
      <span id="w"></span>
      <span id="x"></span>
      <span id="t"></span>
      <span id="u"></span>
      <span id="g"></span>
      <span id="h"></span>
      <span id="i"></span>
      <span id="c"></span>
      <span id="d"></span>
      <span id="e"></span>
      <span id="f"></span>
      <span id="k"></span>
      <span id="l"></span>
      <span id="j"></span>
      <span id="y"></span>
      <span id="z"></span>
      </div>
    </div>
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
      <div className="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ActionLeft;
