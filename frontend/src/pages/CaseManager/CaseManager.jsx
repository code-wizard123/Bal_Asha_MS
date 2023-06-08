import React, { useEffect } from "react";
import './css/Sidebar.css'
import './css/orphanages.css'
import { useNavigate } from "react-router-dom";
import orphanage from '../../Images/children-edu.jpg';

const CaseManager = () => {
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
      </nav><br></br><br></br>
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          <div className="product-box">
            <img src={orphanage} alt="Orphanage Image" className="product-img"></img>
            <h2 className="product-title">BalAsha</h2>
            <span className="price">Not Assigned: 2/3</span><br></br><br></br>
            <span className="price">Address:  NNP, Goregaon,Mumbai</span>
          </div>
        </div>
      </section>
    </div>
  );

}

export default CaseManager;

