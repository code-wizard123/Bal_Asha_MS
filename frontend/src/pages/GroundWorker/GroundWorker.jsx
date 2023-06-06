import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/groundworker.css";
import ChildImage from "../../Images/ChildImage.jpg";

const GroundWorker = () => {
  const [pinCode, setPinCode] = useState("");
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (pinCode) {
      // Make the Axios GET request to retrieve the children data
      axios
        .get(`http://localhost:4000/api/v1/childs?pinCode=${pinCode}`)
        .then((response) => {
          setChildren(response.data.childs);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pinCode]);

  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };
  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Assuming a year is 365.25 days
    return ageInYears;
  };

  return (
    <div>
      <input
            type="text"
            value={pinCode}
            className="Pincode"
            placeholder="Enter Pin Code"
            onChange={handlePinCodeChange}
          />
          {/* <button onClick={handlePinCodeChange}>Search</button> */}
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          {children.map((child) => (
            <Link
              to="/ActionLeft"
              className="product-box"
              key={child._id}
            >
              <img src="https://images.unsplash.com/photo-1603185030522-05d4497bb180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwY2hpbGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="Child Image" className="product-img" />
              <h2 className="product-title">Name: {child.name}</h2>
              <span className="price">Id: {child._id}</span>
              <br />
              <span className="price">Age : {calculateAge(child.DateOfBirth)}</span>
              <br />
              <span className="price">Gender : {child.gender}</span>
              <br />
              <span className="price">Category : {child.category}</span>
              <br />
              <span className="price">Found At : {child.CCI}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroundWorker;
