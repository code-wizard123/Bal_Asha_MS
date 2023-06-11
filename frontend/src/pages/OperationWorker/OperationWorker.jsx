import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import "./css/OperationWorker.css";
import ChildImage from "../../Images/ChildImage.jpg";
import jwtDecode from "jwt-decode";
// import { OperationManager } from "..";

const OperationWorker = () => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    const getChildren = async () => {
      try {
        const cookie = Cookies.get("token")
        if (cookie) {
          const decoded = jwtDecode(cookie)
          const response = await axios.get(`http://localhost:4000/api/v1/operation/children/${decoded.id}`)
          // console.log(response.data.message.children)
          setChildren(response.data.message.children)
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    getChildren();
  })
  return (
    <div>
      <section className="shop contain">
        <h2 className="section-title">Children under you</h2>
        <div className="shop-content">
          <div className="content">
            {/* {children.map((child, index) => (
              <div key={index}>{child.name}</div>
            ))} */}
            {children.map((child, index) => (
            // <Link
            //   to={{
            //     pathname: "/GroundWorker",
            //     state: { orphanageID: "Rahul's Orphanage" }
            //   }}
            //   className="product-box"
            //   key={orphanage._id}
            // >
            <div className="product-box" key={index}>
              <div className="Image-box">
              <img
                src="https://content.jdmagicbox.com/comp/hyderabad/b3/040pxx40.xx40.131123151657.m4b3/catalogue/care-and-love-orphanage-gajularamaram-hyderabad-orphanages-for-children-2mtljew-250.jpg"
                alt="Orphanage Image"
                className="product-img"
              />
              </div>
              <div>
              <h2 className="product-title">Name: {child.name}</h2>
              <p className="product-description">Description: {child.keyCase}</p>
              <form>
                <select /*value={selectedOption} onChange={handleChange} */>
                  <option>Select Option</option>
                  <option>Ok</option>
                </select>
              </form>
              <button class="DeleteChildButton">Delete Child</button>
              </div>
              </div>
              // </Link>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OperationWorker;
