import React from "react";
import ChildImage from "../../Images/ChildImage.jpg";
import "./css/viewprocessflow.css"

const ViewProcessFlow = () => {
  
  return (
    <div>
        <div class="process-flow">
            <img class="view-process-img"src={ChildImage} alt="ChildImage"></img>
        </div>
    </div>
  );
};

export default ViewProcessFlow;
