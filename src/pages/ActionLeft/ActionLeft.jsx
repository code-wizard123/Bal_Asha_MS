import React, { useEffect, useState } from "react";
import "./css/actionleft.css";
import child from "../../Images/ChildImage.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionLeft = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [childDetails, setChildDetails] = useState();
  const [actionLeft, setActionLeft] = useState([]);
  const notify = () => toast("Email Sent Successfully");

  const viewProcess = () => {
    navigate(`/ViewProcessFlow/${id}`)
  }

  const handleProcess = () => {
    if (childDetails._id) {
      navigate(`/ProcessDone/${childDetails._id}`)
    }
  }

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
      const checkedActions = [];

      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      checkboxes.forEach((checkbox) => {
        const [action, index] = checkbox.id.split('-');
        checkedActions.push({ action, index });
      });

      const data = {
        emailId: "manavshah.2003.ms@gmail.com",
        childDetails: [childDetails], // Wrap childDetails in an array
        checkedActions,
      };

      await axios.post("http://localhost:4000/api/v1/sendEmail", data);
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
                  deleteEntry(index);
                }}
              >
                <li>
                  {action === "photoPublication1" && (
                    <React.Fragment>
                      <span>{action}</span><br />

                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id={`TarunBharat-${index}`}
                          />
                          <label class="list" htmlFor={`TarunBharat-${index}`}>
                            Tarun Bharat
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id={`Sakal-${index}`}
                          />
                          <label class="list" htmlFor={`Sakal-${index}`}>Sakal</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id={`Pudhari-${index}`}
                          />
                          <label class="list" htmlFor={`Pudhari-${index}`}>Pudhari</label>
                        </li>
                      </ul>
                    </React.Fragment>
                  )}
                  {action === "photoPublication2" && (
                    <React.Fragment>
                      <span>{action}</span><br />
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id={`MaharashtraTimes-${index}`}
                          />
                          <label class="list" htmlFor={`MaharashtraTimes-${index}`}>
                            Maharashtra Times
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id={`Sakal2-${index}`}
                          />
                          <label class="list" htmlFor={`Sakal2-${index}`}>Sakal</label>
                        </li>
                      </ul>
                    </React.Fragment>
                  )}

                </li>

              </a>

            ))}
          </ul>
        </div>
      </nav>


      <div className="profile">
        <img src={childDetails.images[0].url} alt="Child Avatar" />
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

        <button onClick={handleProcess}>Add Process</button>
        <button onClick={viewProcess}>View Process</button>
      </div>
      <div className="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default ActionLeft;
