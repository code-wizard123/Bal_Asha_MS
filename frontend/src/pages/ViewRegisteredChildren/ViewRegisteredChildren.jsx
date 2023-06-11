import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/viewregisteredchildren.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ChildImage from "../../Images/ChildImage.jpg";

const ViewRegisteredChildren = () => {
  const [children, setChildren] = useState([]);
  const [pincode, setPincode] = useState();

  // useEffect(() => {
  //   const fetchPincode = async () => {
  //     try {
  //       const cookie = Cookies.get("token");
  //       const { id } = jwtDecode(cookie);
  //       const response = await axios.post("http://localhost:4000/api/v1/me", { id });
  //       const searchPin = response.data.employee.pincode;
  //       setPincode(searchPin);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchPincode();
  // }, []);

  useEffect(() => {
    const fetchChildren = async () => {
      // if (setpincode) {
        try {
          const response = await axios.get("http://localhost:4000/api/v1/backupChild");
          const childrenData = response.data.backupChildren;
          setChildren(childrenData);
        } catch (error) {
          console.log(error);
        }
      // }
    };

    fetchChildren();
  }, []);

  const calculateAge = (DateOfBirth) => {
    const birthDate = new Date(DateOfBirth);
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Assuming a year is 365.25 days
    return ageInYears;
  };

  const handleDownload = (url,fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Trigger the click event on the link
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log('Download error:', error);
      });
  };

  return (
    <div class="animation2">
      <section className="shop2 contain2">
        <h2 className="section-title2">Children</h2>
        <div className="shop-content2">
          {children && children.length > 0 ? (
            children.map((child) => (
              <div className="product-box2" key={child._id}>
                <div className="Image-box2">
                  <img src={child.images[0].url} alt="Child Image" className="product-img2" />
                </div>
                <div>
                  <h2 className="product-title">Name: {child.name}</h2>
                  {/* <span className="price">Id: {child._id}</span> */}
                  <br />
                  <span className="price">Age: {calculateAge(child.DateOfBirth)}</span>
                  <br />
                  <span className="price">Gender: {child.gender}</span>
                  <br />
                  <span className="price">Category: {child.category}</span>
                  <br />
                  {/* <span className="price">
                    Found At: {child.CCI[0].name}
                  </span> */}
                  <br />
                  {Object.entries(child).map(([key, value]) => {
                    if (key !== "name" && key !== "_id" && key !== "gender" && key !== "category" && key !== "CCI" && key !== "DateOfBirth") {
                      return (
                        <div key={key}>
                          <span className="price2">{key}:   </span>
                          {Array.isArray(value) ? (
                            value.map((item, index) => (
                              <div key={index}>
                                <a href={item.url} onClick={() => handleDownload(item.url)}>
                                  Download Report {index + 1}
                                </a>
                              </div>
                            ))
                          ) : (
                            <a href={value.url} onClick={() => handleDownload(value.url)}>
                              Download Report
                            </a>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>No children available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewRegisteredChildren;