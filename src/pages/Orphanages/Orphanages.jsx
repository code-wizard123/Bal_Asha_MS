import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/orphanages.css";
import ChildImage from "../../Images/ChildImage.jpg";
import { BASE_URL } from "../../services/helper";

const Orphanages = () => {
  const [pinCode, setPinCode] = useState("");
  const [orphanages, setOrphanages] = useState([]);

  useEffect(() => {
    if (pinCode) {
      // Make the Axios GET request to retrieve the orphanages data
      axios
        .get(`${BASE_URL}/api/v1/childs/orphanage?pinCode=${pinCode}`)
        .then((response) => {
          setOrphanages(response.data.CCIs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pinCode]);

  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={pinCode}
        className="Pincode"
        placeholder="Enter Pin Code"
        onChange={handlePinCodeChange}
      />
      <section className="shop contain">
        <h2 className="section-title">Orphanages</h2>
        <div className="shop-content">
          <div className="content">
          {orphanages.map((orphanage) => (
            <Link
              to={{
                pathname: "/GroundWorker",
                state: { orphanageID: "Rahul's Orphanage" }
              }}
              className="product-box"
              key={orphanage._id}
            >
              <img
                src="https://content.jdmagicbox.com/comp/hyderabad/b3/040pxx40.xx40.131123151657.m4b3/catalogue/care-and-love-orphanage-gajularamaram-hyderabad-orphanages-for-children-2mtljew-250.jpg"
                alt="Orphanage Image"
                className="product-img"
              />
              <h2 className="product-title">Name: {orphanage.name}</h2>
              <p className="product-description">Description: {orphanage.CCIdescription}</p>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default Orphanages;
