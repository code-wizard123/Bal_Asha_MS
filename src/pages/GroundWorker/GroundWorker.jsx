import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/groundworker.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ChildImage from "../../Images/ChildImage.jpg";
import { BASE_URL } from "../../services/helper";
import profile from "../../Images/profile.jpg";

const GroundWorker = () => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const cookie = Cookies.get("token")
        const { id } = jwtDecode(cookie)
        const response = await axios.get(`${BASE_URL}/api/v1/ground/children/${id}`);
        setChildren(response.data.message.children);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChildren();
  }, []);

  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Assuming a year is 365.25 days
    return ageInYears;
  };

  return (
    <>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <a href="/Profile"><li> <img class="profileImg" src={profile} alt="profile" /> Profile</li></a>
          </ul>
        </div>
      </nav>
      <br></br><br></br>
      <div className="animation1">
        <section className="shop1 contain1">
          <h2 className="section-title1">Children</h2>
          <div className="shop-content1">
            {children && children.length > 0 ? (
              children.map((child, index) => (
                <Link to={"/ActionLeft/" + child._id} className="product-box1" key={index}>
                  <div className="Image-box1">
                    <img src={child.images[0].url} alt="Child Image" className="product-img1" />
                  </div>
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
    </>
  );
};

export default GroundWorker;
