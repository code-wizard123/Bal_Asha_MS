import React, { useEffect, useState } from "react";
import './css/Sidebar.css'
import './css/orphanages.css'
import orphanage from '../../Images/children-edu.jpg';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const getCategory = {
  1: "Abandoned",
  2: "Surrendered",
  3: "Orphaned by Guardian"
}

const CaseManager = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/ActionLeft/${id}`)
    navigate(0)
  }

  const [pincode, setPincode] = useState(null);
  const [children, setChildren] = useState([]);

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

  const handleProfileClick = () => {
    // Logic to show profile details of the employee
    console.log("Profile clicked");
    <a href="/Profile"></a>
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
            <a href="#"><li>Home</li></a>
            <a href="#"><li>About</li></a>
            <a href="#"><li>Info</li></a>
            <a href="#"><li>Contact</li></a>
            <a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a>
          </ul>
        </div>
      </nav>
      <br></br>
      <br></br>
      <div className="profile-icon" onClick={handleProfileClick}>
          <FaUser />
        </div>
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          {children.map((child, index) => (
            <div className="product-box" key={index} onClick={() => handleClick(child._id)}>
              <img src={orphanage} alt="Orphanage Image" className="product-img" />
              <h2 className="product-title">{child.name}</h2>
              <span className="price">Category: {getCategory[child.category]}</span><br /><br />
              <span className="price">Family Details {child.familyDetails}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CaseManager;
