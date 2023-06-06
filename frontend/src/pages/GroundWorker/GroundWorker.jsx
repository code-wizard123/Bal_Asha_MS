import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/groundworker.css";
import ChildImage from "../../Images/ChildImage.jpg";

const GroundWorker = ({orphanageName ,handleName}) => {
  const location = useLocation();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const orphanageName = location.state && location.state.orphanageName;
    console.log(orphanageName)
    if (orphanageName) {
       axios
        .get(`http://localhost:4000/api/v1/childs/CCI?CCIName=Rahul's Orphanage`)
        .then((response) => {
          if (response.data && response.data.childs) {
            setChildren(response.data.childs);
            console.log("Manan");
          } else {
            console.log("Invalid response data:", response.data);
          }
        })
        .catch((error) => {
          console.log("API request error:", error);
        });
    }
  }, [location.state]);

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
          {children.map((child) => (
            <Link to="/ActionLeft" className="product-box" key={child._id}>
              <img
                src="https://images.unsplash.com/photo-1603185030522-05d4497bb180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwY2hpbGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt="Child Image"
                className="product-img"
              />
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
          ))}
        </div>
      </section>


      </div>
  );
};

export default GroundWorker;
