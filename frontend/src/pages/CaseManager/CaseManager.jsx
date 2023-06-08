import React, { useEffect } from "react";
import './css/Sidebar.css'
import './css/orphanages.css'
import { useNavigate } from "react-router-dom";
import orphanage from '../../Images/children-edu.jpg';
import UseDetails from "../../hooks/UseDetails";

const CaseManager = () => {
  let initialRender = true;
  const navigate = useNavigate();
  const details = UseDetails();
  useEffect(() => {
    if(!initialRender && details){
      console.log("Yay")
    }
    if(initialRender){
      initialRender = false;
    }
  }, [])

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
        <section class="shop contain">
          <h2 class="section-title">Orphanages</h2>
          <div class="shop-content">
            <div class="product-box">
              <img src={orphanage} alt="Orphanage Image" class="product-img"></img>
              <h2 class="product-title">BalAsha</h2>
              <span class="price">Not Assigned: 2/3</span><br></br><br></br>
              <span class="price">Address:  NNP, Goregaon,Mumbai</span>
            </div>
          </div>
        </section>
      </div>
    );
  
}

// const CaseManager = () => {
// 	<li className="hambuger-dashboard">
//         <Sidebar/>
//   </li>
// };


export default CaseManager;

