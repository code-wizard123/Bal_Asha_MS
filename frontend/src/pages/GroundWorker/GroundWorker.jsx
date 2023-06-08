import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/groundworker.css";
import ChildImage from "../../Images/ChildImage.jpg";
// import UseDetails from "../../hooks/UseDetails";

const GroundWorker = () => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/childs/CCI?CCIName=Rahul's Orphanage")
      .then((response) => {
        setChildren(response.data.children);
        console.log(response.data);
        console.log(children);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Assuming a year is 365.25 days
    return ageInYears;
  };

  return (
    <div class="animation">
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          {children && children.length > 0 ? (
            children.map((child) => (
              <Link to={"/ActionLeft/" + child._id} className="product-box" key={child._id}>
                <img src={ChildImage} alt="Child Image" className="product-img" />
                <h2 className="product-title">Name: {child.name}</h2>
                <span className="price">Id: {child._id}</span>
                <br />
                <span className="price">Age: {calculateAge(child.DateOfBirth)}</span>
                <br />
                <span className="price">Gender: {child.gender}</span>
                <br />
                <span className="price">Category: {child.category}</span>
                <br />
                <span className="price">Found At: {child.CCI.name}</span>
              </Link>
            ))
          ) : (
            <p>No children available</p>
          )}
        </div>
      </section>


    </div>
  );
};

export default GroundWorker;
