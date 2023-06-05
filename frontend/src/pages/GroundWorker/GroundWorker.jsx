import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/groundworker.css'
import child from '../../Images/Child.jpg';

const GroundWorker = () => {
  const [childName, setChildName] = useState("");

  useEffect(() => {
    // Make the Axios GET request to retrieve the child's data
    axios.get('http://localhost:4000/api/v1/admin/child/647dad74c0d4365beddb6306') // Replace ":id" with the actual child ID
      .then(response => {
        const { name } = response.data.child; // Assuming the child's name is returned in the "name" field
        setChildName(name);
        // console.log(name);
        console.log(name);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          <Link to="/ActionLeft" className="product-box">
            <img src={child} alt="Child Image" className="product-img"></img>
            <h2 className="product-title">Name: {childName}</h2>
            <span className="price">Id: 23/Asha</span>
            <br></br>
            <br></br>
            <span className="price">Action left: CSR, MER</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default GroundWorker;
