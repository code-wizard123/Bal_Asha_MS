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
  const [operation, setOperation] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const employee_id = e.target[0].value
    const child_id = id;
    const response = await axios.post(`http://localhost:4000/api/v1/${employee_id}/${child_id}`)

    if(response.data.success){
      // window.location.reload()
      try{
        const response2 = await axios.post(`http://localhost:4000/child/update/${child_id}`, {category: 2})
        console.log(response2.data)
      }
      catch(e){
        console.log(e)
      }
      
    }
  }

  const [pincode, setPincode] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const getOperation = async () => {
      if (children) {
        try {
          const response = await axios.get("http://localhost:4000/api/v1/getemployee/2");
          const { employees } = response.data
          setOperation(employees)
        } catch (error) {
          console.log("API request error:", error);
        }
      }
    }

    getOperation();
  }, [children])

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
        <h2 className="section-title">Children</h2>
        <div className="shop-content">
          <div className="content">
          {children.map((child, index) => (
            <div className="product-box" key={index}>
              <img src={orphanage} alt="Orphanage Image" className="product-img" />
              <h2 className="product-title">{child.name}</h2>
              <span style={{ color: child.isAssigned ? "green" : "red" }} className="price">Category: {getCategory[child.category]}</span><br /><br />
              <span style={{ color: child.isAssigned ? "green" : "red" }} className="price">Family Details {child.familyDetails}</span>
              { child.isAssigned ? 
              (<>
                <br /><span style={{color: "green"}} className="price">Assigned To: {child.assignedTo}</span>
              </>): 
              (
                <form onSubmit={(e) => handleSubmit(e, child._id)}>
                <select>
                  <option value="">Select Operation Manager</option>
                  {operation.map((option, index) => (
                    <option key={index} value={option._id} >
                      {option.name}-{option._id}
                    </option>
                  ))}
                </select>
                <button>Add Case</button>
              </form>
              )}
              
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default CaseManager;
