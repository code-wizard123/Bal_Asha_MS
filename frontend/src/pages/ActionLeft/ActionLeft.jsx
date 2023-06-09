import React, { useEffect, useState } from "react";
import "./css/actionleft.css";
import child from "../../Images/ChildImage.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionLeft = () => {
  const navigate = useNavigate();
  const [childDetails, setChildDetails] = useState();
  const [actionLeft, setActionLeft] = useState([]);
  const [operation, setOperation] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const notify = () => toast("Email Sent Successfully");

  const handleProcess = () => { 
    if(childDetails._id){
      navigate(`/ProcessDone/${childDetails._id}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedOption){
      console.log(selectedOption)
      const filtered = operation.filter(op => op._id === selectedOption)
      console.log(filtered[0])
    }
  }

  const handleOptionChange = (e) => {
    const current = e.target.value;
    setSelectedOption(current)
  }
  // const [childDetails, setChildDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getChildDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/groundWorker/childs/${id}`
        );
        const { child } = response.data;
        setChildDetails(child);
        setActionLeft(child.actionLeft);
      } catch (error) {
        console.log("API request error:", error);
      }
    };

    getChildDetails();
  }, []);

  useEffect(() => {
    const getOperation = async () => {
      if (childDetails) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/operation/${childDetails.pinCode}`
          );
          const { employees } = response.data
          setOperation(employees)
        } catch (error) {
          console.log("API request error:", error);
        }
      }
    }

    getOperation();
  }, [childDetails])

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
      <div className="animate">
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
        <p>
          <div color="red" onClick={handleProcess}>View Process</div>
        </p>
        <form onSubmit={handleSubmit}>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select Operation Manager</option>
            {operation.map((option, index) => (
              <option key={index} value={option._id} >
                {option.name}-{option._id}
              </option>
            ))}
          </select>
          <button>SUBMIT</button>
        </form>
      </div>
      <div className="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ActionLeft;
