import React from "react";
import './css/groundworker.css'
import child from '../../Images/Child.jpg';


const GroundWorker=()=>{
    return (
<div>
<section class="shop contain">
  <h2 class="section-title">Orphanages</h2>
  <div class="shop-content">
      <div class="product-box">
        <img src={child} alt="Child Image" class="product-img"></img>
        <h2 class="product-title">Name: Avinash</h2>
        <span class="price">Id: 23/Asha</span><br></br><br></br>
        <span class="price">Action left: CSR,MER</span>
      </div>
  </div>
</section>
</div>
	);
}

export default GroundWorker;

