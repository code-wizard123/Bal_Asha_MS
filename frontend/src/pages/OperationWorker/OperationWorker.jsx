import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import "./css/OperationWorker.css";
import ChildImage from "../../Images/ChildImage.jpg";
import jwtDecode from "jwt-decode";
import Component from "./Component";

const OperationWorker = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate()

  const handleClick = async (child) => {
    const response = await axios.get(`http://localhost:4000/api/v1/process/${child._id}`)
    navigate(`/ReactFlow/${child._id}/${response.data.process[0]._id}`)
  }

  const handleDelete = async (childId) => {
    try {
      // Delete the child
      const deleteChildResponse = await axios.delete(`http://localhost:4000/api/v1/admin/child/${childId}`);

      if (deleteChildResponse.status === 200) {
        const token = Cookies.get("token")
        const decoded_id = jwtDecode(token)
        const updateCasesClosedResponse = await axios.put(`http://localhost:4000/api/v1/employees/${decoded_id}/updateCasesClosed`);

        if (updateCasesClosedResponse.status === 200) {
          // Cases Closed updated successfully
          const updatedChildren = children.filter(child => child._id !== childId);
          setChildren(updatedChildren);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getChildren = async () => {
      try {
        const cookie = Cookies.get("token");
        if (cookie) {
          const decoded = jwtDecode(cookie)
          const response = await axios.get(`http://localhost:4000/api/v1/operation/children/${decoded.id}`)
          setChildren(response.data.message.children)
        }
      } catch (error) {
        console.log(error);
      }
    };

    getChildren();
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault()
    const employee_id = e.target[0].value
    const child_id = id;
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/${employee_id}/${child_id}`)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <section className="shop contain">
        <h2 className="section-title">Children under you</h2>
        <div className="shop-content">
          <div className="content">
            {children.map((child, index) => (
              <div className="product-box" key={index}>
                <div className="Image-box">
                  <img
                    src={child.images[0].url}
                    alt="Orphanage Image"
                    className="product-img"
                  />
                </div>
                <div class="product2">
                  <h2 className="product-title">Name: {child.name}</h2>
                  <p className="product-description">Description: {child.keyCase}</p>
                  <Component pincode={child.pincode} id={child._id} handleSubmit={handleSubmit} />
                  <button className="DeleteChildButton" onClick={() => handleClick(child)}>View Process</button>
                  <button className="DeleteChildButton" onClick={() => handleDelete(child._id, child.processId)}>Delete Child</button></div>
              </div>
            ))}
          </div >
        </div >
      </section >
    </div >
  );
};

export default OperationWorker;
