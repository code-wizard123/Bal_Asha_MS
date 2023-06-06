import React from "react";
import './css/actionleft.css'
import child from '../../Images/ChildImage.jpg';


const ActionLeft=()=>{
    return (
		<div>
<nav role="navigation">
  <div id="menuToggle">
    <input type="checkbox" />

    <span></span>
    <span></span>
    <span></span>

    <ul id="menu">
      <a href="#"><li>Photo Publication1</li></a>
      <a href="#"><li>Photo Publication2</li></a>
      <a href="#"><li>TV Telecasting</li></a>
      <a href="#"><li>Police report</li></a>
      <a href="#"><li>MER</li></a>
      <a href="#"><li>CSR</li></a>
    </ul>
  </div>
</nav><br></br><br></br>
<div class="profile">
    <img src={child} alt="Child Avatar"/>
    <h2>Aditi Sharma</h2>
    <p><label>Age:</label> 7 years</p>
    <p><label>Gender:</label> Female</p>
    <p><label>Processes Left:</label>Photo Publication1,Photo Publication2,TV Telecasting,Police report,MER,CSR</p>
    <p><label>KeyCase:</label>She is a special need child.The child was taken charge by Kurla Railway police station on 12/08/2019 and admitted to Additional observation Home</p>
  </div>
</div>
	);
}

export default ActionLeft;

