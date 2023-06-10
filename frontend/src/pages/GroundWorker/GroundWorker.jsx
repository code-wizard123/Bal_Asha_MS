import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/groundworker.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ChildImage from "../../Images/ChildImage.jpg";

const GroundWorker = () => {
  const [children, setChildren] = useState([]);
  const [pincode, setPincode] = useState();
  useEffect(() => {
    const fetchPincode = async () => {
      try {
        const cookie = Cookies.get("token")
        const { id } = jwtDecode(cookie)
        const response = await axios.post("http://localhost:4000/api/v1/me", { id });
        const searchPin = response.data.employee.pincode;
        setPincode(searchPin);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPincode();
  }, []);

  useEffect(() => {
    const fetchChildren = async (setpincode) => {
      if (setpincode) {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/children/${setpincode}`);
          const childrenData = response.data.children;
          setChildren(childrenData);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchChildren(pincode);
  }, [pincode]);

  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Assuming a year is 365.25 days
    return ageInYears;
  };

  return (
    <div class="animation1">
      <section className="shop1 contain1">
        <h2 className="section-title1">Children</h2>
        <div className="shop-content1">
          {children && children.length > 0 ? (
            children.map((child) => (
              <Link to={"/ActionLeft/" + child._id} className="product-box1" key={child._id}>
                <img src={ChildImage} alt="Child Image" className="product-img1" />
                <div>
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
                </div>
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
